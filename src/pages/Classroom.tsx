import { AnimalCard } from '@/components/AnimalCard';
import { animals } from '@/lib/animal_data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Play, StopCircle } from 'lucide-react';

const Classroom = () => {
  const navigate = useNavigate();
  const [slideshow, setSlideshow] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canReplay, setCanReplay] = useState(false);
  const [phase, setPhase] = useState<'announcement' | 'audio' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getAnnouncementDuration = () => 1800; // ms
  const getAudioDuration = () => (audioRef.current?.duration ? audioRef.current.duration * 1000 : 2000); // ms

  const runSlideshow = (index: number) => {
    if (index >= animals.length) {
      setSlideshow(false);
      setCurrent(0);
      setProgress(0);
      setCanReplay(false);
      setPhase(null);
      return;
    }
    setCurrent(index);
    setProgress(0);
    setCanReplay(false);
    setPhase('announcement');
    const announcementDuration = getAnnouncementDuration();
    // Animate progress for announcement phase
    let start = Date.now();
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const split = announcementDuration / (announcementDuration + (audioRef.current?.duration ? audioRef.current.duration * 1000 : 2000));
      setProgress(Math.min(100 * (elapsed / announcementDuration) * split, 100 * split));
      if (elapsed >= announcementDuration) {
        setProgress(100 * split);
        clearInterval(timeoutRef.current!);
      }
    }, 50);
    // Announce
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`This is the ${animals[index].name} sound`);
      utterance.rate = 0.9;
      utterance.onend = () => {
        setPhase('audio');
        if (audioRef.current) {
          audioRef.current.src = animals[index].audio;
          audioRef.current.currentTime = 0;
          audioRef.current.onended = () => {
            setCanReplay(true);
            setPhase(null);
            setProgress(100);
            timeoutRef.current = setTimeout(() => runSlideshow(index + 1), 2000);
          };
          audioRef.current.ontimeupdate = () => {
            const split = announcementDuration / (announcementDuration + (audioRef.current?.duration ? audioRef.current.duration * 1000 : 2000));
            if (audioRef.current && audioRef.current.duration) {
              const audioProgress = audioRef.current.currentTime / audioRef.current.duration;
              setProgress(split * 100 + (1 - split) * 100 * audioProgress);
            }
          };
          audioRef.current.play();
        }
      };
      speechSynthesis.speak(utterance);
    } else {
      // Fallback: just play audio
      setPhase('audio');
      if (audioRef.current) {
        audioRef.current.src = animals[index].audio;
        audioRef.current.currentTime = 0;
        audioRef.current.onended = () => {
          setCanReplay(true);
          setPhase(null);
          setProgress(100);
          timeoutRef.current = setTimeout(() => runSlideshow(index + 1), 2000);
        };
        audioRef.current.ontimeupdate = () => {
          const split = announcementDuration / (announcementDuration + (audioRef.current?.duration ? audioRef.current.duration * 1000 : 2000));
          if (audioRef.current && audioRef.current.duration) {
            const audioProgress = audioRef.current.currentTime / audioRef.current.duration;
            setProgress(split * 100 + (1 - split) * 100 * audioProgress);
          }
        };
        audioRef.current.play();
      }
    }
  };

  const startSlideshow = async () => {
    setSlideshow(true);
    setCurrent(0);
    setProgress(0);
    setCanReplay(false);
    setPhase(null);
    runSlideshow(0);
  };

  const stopSlideshow = () => {
    setSlideshow(false);
    setCurrent(0);
    setProgress(0);
    setCanReplay(false);
    setPhase(null);
    if (audioRef.current) audioRef.current.pause();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const replayCurrent = () => {
    setProgress(0);
    setCanReplay(false);
    setPhase(null);
    runSlideshow(current);
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <audio ref={audioRef} />
      {/* Floating Slideshow Button */}
      {!slideshow && (
        <Button
          variant="hero"
          size="lg"
          className="fixed top-4 right-20 z-50 shadow-lg animate-zoom-in-out-slow flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          aria-label="Start animal sound slideshow"
          onClick={startSlideshow}
        >
          <Play className="w-6 h-6" />
          Start Slideshow
        </Button>
      )}
      {/* Stop Button */}
      {slideshow && (
        <Button
          variant="destructive"
          size="icon"
          className="fixed top-4 right-20 z-50 shadow-lg"
          aria-label="Stop slideshow"
          onClick={stopSlideshow}
        >
          <StopCircle className="w-6 h-6" />
        </Button>
      )}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>{'<'} Back</Button>
          <h2 className="text-4xl font-bold text-primary mx-auto">Animal Training Room</h2>
        </div>
        {/* Cards or Slideshow Info */}
        {!slideshow ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animals.map((animal, index) => (
              <div key={animal.name} style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimalCard {...animal} trainingMode />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <AnimalCard {...animals[current]} trainingMode autoPlay progressOverride={progress} onReplay={replayCurrent} playButtonDisabled={!canReplay} />
            <div className="mt-6 text-lg text-primary font-semibold">{`Now playing: ${animals[current].name}`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom; 