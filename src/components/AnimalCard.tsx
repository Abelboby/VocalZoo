import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, Check, AlertCircle } from 'lucide-react';

interface AnimalCardProps {
  name: string;
  sound: string;
  image?: string;
  emoji: string;
  audio: string;
  trainingMode?: boolean;
}

export const AnimalCard = ({ name, sound, emoji, audio, trainingMode }: AnimalCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<'success' | 'retry' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to get durations
  const getAnnouncementDuration = () =>  trainingMode ? 1800 : 1500; // ms, rough estimate
  const getAudioDuration = () => (audioRef.current?.duration ? audioRef.current.duration * 1000 : 2000); // ms

  const playSound = () => {
    setIsPlaying(true);
    setRecognitionResult(null);
    setProgress(0);
    let totalDuration = getAnnouncementDuration();
    if (audioRef.current) {
      totalDuration += audioRef.current.duration ? audioRef.current.duration * 1000 : 2000;
    }
    // Animate progress
    let start = Date.now();
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / totalDuration) * 100));
      if (elapsed >= totalDuration) {
        setProgress(100);
        clearInterval(progressRef.current!);
      }
    }, 50);
    // Announce for screen readers first
    if ('speechSynthesis' in window) {
      const announcement = trainingMode
        ? `This is the ${name} sound`
        : 'Guess this animal sound';
      const utterance = new SpeechSynthesisUtterance(announcement);
      utterance.rate = 0.9;
      utterance.onend = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      };
      speechSynthesis.speak(utterance);
    } else {
      // Fallback: just play audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
      if (progressRef.current) clearInterval(progressRef.current);
    };
    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    setRecognitionResult(null);
    setAttempts(prev => prev + 1);
    
    // Announce for screen readers
    const announcement = `Listening for you to say ${name}. Speak clearly into your microphone.`;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(announcement);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
    
    // Simulate voice recognition with random success
    setTimeout(() => {
      setIsListening(false);
      const success = Math.random() > 0.3; // 70% success rate
      setRecognitionResult(success ? 'success' : 'retry');
      
      // Audio feedback
      const feedback = success ? 
        `Great job! You said ${name} correctly!` : 
        `Try again! Listen to the ${name} sound and repeat the name clearly.`;
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(feedback);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    }, 3000);
  };

  return (
    <div 
      className="glass-card hover:scale-105 transition-all duration-300 animate-scale-in focus-within:ring-4 focus-within:ring-primary/50"
      role="region"
      aria-label={`Learning activity for ${name}`}
    >
      <audio ref={audioRef} src={audio} preload="auto" />
      <div className="text-center space-y-6">
        <div 
          className="text-8xl animate-bounce-gentle" 
          role="img" 
          aria-label={`${name} emoji`}
        >
          {emoji}
        </div>
        <h3 className="text-2xl font-bold text-primary">{name}</h3>
        <p className="text-muted-foreground text-lg">
          {trainingMode
            ? `Press Play Sound to hear what a ${name} sounds like.`
            : `Step 1: Listen to the ${name} sound. Step 2: Say "${name}" clearly.`}
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              variant="playful"
              size="lg"
              onClick={playSound}
              disabled={isPlaying}
              className={`${isPlaying ? 'animate-pulse' : ''} min-w-[140px] text-lg`}
              aria-label={`Play ${name} sound - ${sound}`}
              aria-describedby={`${name}-instructions`}
            >
              <Volume2 className="w-6 h-6" />
              {isPlaying ? 'Playing...' : 'Play Sound'}
            </Button>
          </div>
          {isPlaying && (
            <div className="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-primary transition-all duration-100 linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          {!trainingMode && (
            <div className="flex justify-center">
              <Button
                variant="glass"
                size="lg"
                onClick={startListening}
                disabled={isListening || isPlaying}
                className={
                  `${isListening ? 'animate-pulse bg-accent/30' : 'text-primary font-semibold'} min-w-[140px] text-lg disabled:text-gray-700 disabled:bg-gray-100 disabled:opacity-100`
                }
                aria-label={`Start voice recognition to say ${name}`}
                aria-describedby={`${name}-listening-status`}
              >
                <Mic className="w-6 h-6" />
                {isListening ? 'Listening...' : 'Speak Now'}
              </Button>
            </div>
          )}
        </div>
        
        <div id={`${name}-instructions`} className="sr-only">
          Press Play Sound to hear the {name} make a {sound} sound, then press Speak Now and say {name} into your microphone.
        </div>
        
        {isListening && (
          <div className="text-accent font-semibold animate-pulse">
            🎤 Say "{name}" into your microphone!
          </div>
        )}
        
        {recognitionResult === 'success' && (
          <div className="flex items-center justify-center gap-2 text-success font-bold text-lg animate-bounce-gentle">
            <Check className="w-6 h-6" />
            Excellent! You got it right! 🎉
          </div>
        )}
        
        {recognitionResult === 'retry' && (
          <div className="flex items-center justify-center gap-2 text-accent font-semibold">
            <AlertCircle className="w-5 h-5" />
            Try again! You can do it! 💪 (Attempt {attempts})
          </div>
        )}
      </div>
    </div>
  );
};