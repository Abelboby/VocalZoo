import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Mic } from 'lucide-react';

interface AnimalCardProps {
  name: string;
  sound: string;
  image?: string;
  emoji: string;
}

export const AnimalCard = ({ name, sound, emoji }: AnimalCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const playSound = () => {
    setIsPlaying(true);
    // Simulate sound playing
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="glass-card hover:scale-105 transition-all duration-300 animate-scale-in">
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce-gentle">
          {emoji}
        </div>
        <h3 className="text-2xl font-bold text-primary">{name}</h3>
        <p className="text-muted-foreground">
          Listen to the sound and say the animal name!
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              variant="playful"
              size="lg"
              onClick={playSound}
              disabled={isPlaying}
              className={isPlaying ? 'animate-pulse' : ''}
            >
              <Volume2 className="w-5 h-5" />
              {isPlaying ? 'Playing...' : 'Play Sound'}
            </Button>
          </div>
          
          <div className="flex justify-center">
            <Button
              variant="glass"
              size="lg"
              onClick={startListening}
              disabled={isListening}
              className={isListening ? 'animate-pulse bg-accent/30' : ''}
            >
              <Mic className="w-5 h-5" />
              {isListening ? 'Listening...' : 'Speak Now'}
            </Button>
          </div>
        </div>
        
        {isListening && (
          <div className="text-accent font-semibold animate-pulse">
            🎤 Say "{name}" into your microphone!
          </div>
        )}
      </div>
    </div>
  );
};