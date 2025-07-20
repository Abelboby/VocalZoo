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
  autoPlay?: boolean;
  progressOverride?: number;
  onReplay?: () => void;
  playButtonDisabled?: boolean;
  onResult?: (result: 'success' | 'retry') => void; // <-- add this
  examAutomation?: boolean;
}

export const AnimalCard = ({ name, sound, emoji, audio, trainingMode, autoPlay, progressOverride, onReplay, playButtonDisabled, onResult, examAutomation }: AnimalCardProps) => {
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
        : '';
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

  useEffect(() => {
    if (examAutomation) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examAutomation, name]);

  useEffect(() => {
    if (!examAutomation) return;
    if (!isPlaying && progress === 100) {
      // Wait a short moment, then start listening
      const listenTimeout = setTimeout(() => {
        startListening();
      }, 400);
      return () => clearTimeout(listenTimeout);
    }
  }, [isPlaying, progress, examAutomation]);

  const startListening = () => {
    setIsListening(true);
    setRecognitionResult(null);
    setAttempts(prev => prev + 1);

    // Announce for screen readers
    let announcement = 'Guess the animal sound.';
    if (examAutomation && attempts >= 2) {
      announcement += ' If you want to skip this question, say next.';
    }
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(announcement);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }

    // Web Speech API setup
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsListening(false);
      setRecognitionResult('retry');
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Speech recognition is not supported in this browser.');
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      setIsListening(false);
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      const animalName = name.trim().toLowerCase();
      const success = transcript.includes(animalName);
      // If 3rd attempt and user says 'next', skip
      if (examAutomation && attempts >= 2 && transcript.includes('next')) {
        if (onResult) onResult('retry');
        return;
      }
      setRecognitionResult(success ? 'success' : 'retry');
      if (success && onResult) onResult('success');
      // Audio feedback
      const feedback = success
        ? `Great job! You said ${name} correctly!`
        : `Try again!`;
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(feedback);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    };
    recognition.onerror = (event: any) => {
      setIsListening(false);
      setRecognitionResult('retry');
      let errorMsg = 'Error occurred during speech recognition.';
      if (event.error === 'not-allowed') {
        errorMsg = 'Microphone access denied. Please allow microphone permissions.';
      } else if (event.error === 'no-speech') {
        errorMsg = 'No speech detected. Please try again.';
      }
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(errorMsg);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  // Auto-retry logic for examAutomation
  useEffect(() => {
    if (
      examAutomation &&
      recognitionResult === 'retry' &&
      attempts < 3
    ) {
      // Small delay before retrying
      const retryTimeout = setTimeout(() => {
        setRecognitionResult(null);
        setProgress(0);
        playSound();
      }, 900);
      return () => clearTimeout(retryTimeout);
    }
    // No auto-retry if attempts >= 3
  }, [examAutomation, recognitionResult, attempts]);

  // Use progressOverride if provided (slideshow mode)
  const progressValue = typeof progressOverride === 'number' ? progressOverride : progress;

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
            {!examAutomation && (
              <Button
                variant="playful"
                size="lg"
                onClick={autoPlay && onReplay ? onReplay : playSound}
                disabled={autoPlay ? !!playButtonDisabled : isPlaying}
                className={`${isPlaying && !autoPlay ? 'animate-pulse' : ''} min-w-[140px] text-lg`}
                aria-label={`Play ${name} sound - ${sound}`}
                aria-describedby={`${name}-instructions`}
              >
                <Volume2 className="w-6 h-6" />
                {autoPlay ? 'Play Again' : isPlaying ? 'Playing...' : 'Play Sound'}
              </Button>
            )}
          </div>
          {(isPlaying || autoPlay) && (
            <div className="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-primary transition-all duration-100 linear"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          )}
          
          {!trainingMode && (
            <div className="flex justify-center">
              {!examAutomation && (
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
            )}
          </div>
          )}
        </div>
        {/* ExamAutomation control button */}
        {examAutomation && (
          <div className="flex justify-center mt-4">
            {isPlaying ? (
              <Button variant="glass" size="lg" disabled className="min-w-[140px] text-lg text-primary font-semibold">
                <Volume2 className="w-6 h-6 mr-2" />
                Playing
              </Button>
            ) : isListening ? (
              <Button variant="glass" size="lg" disabled className="min-w-[140px] text-lg text-primary font-semibold animate-pulse bg-accent/30">
                <Mic className="w-6 h-6 mr-2" />
                Listening
              </Button>
            ) : recognitionResult === 'retry' ? (
              <>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => {
                    setRecognitionResult(null);
                    setAttempts(0);
                    setProgress(0);
                    playSound();
                  }}
                  className="min-w-[140px] text-lg text-primary font-semibold mr-2"
                >
                  <Mic className="w-6 h-6 mr-2" />
                  Retry
                </Button>
                {attempts >= 3 && (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => {
                      if (onResult) onResult('retry');
                    }}
                    className="min-w-[100px] text-lg font-semibold"
                  >
                    Skip
                  </Button>
                )}
              </>
            ) : (
              <Button variant="glass" size="lg" disabled className="min-w-[140px] text-lg text-primary font-semibold">
                <Volume2 className="w-6 h-6 mr-2" />
                Waiting...
              </Button>
            )}
          </div>
        )}
        
        <div id={`${name}-instructions`} className="sr-only">
          Press Play Sound to hear the {name} make a {sound} sound, then press Speak Now and say {name} into your microphone.
        </div>
        
        {/* {isListening && (
          <div className="text-accent font-semibold animate-pulse">
            🎤 Say "{name}" into your microphone!
          </div>
        )} */}
        
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