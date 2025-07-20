import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Volume2, VolumeX, Contrast, Type, Settings2, X } from 'lucide-react';

export const AccessibilityControls = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    if (!largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Resume speech synthesis
      if ('speechSynthesis' in window) {
        speechSynthesis.resume();
      }
    } else {
      // Pause speech synthesis
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!open && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 z-50 shadow-lg bg-white/80 hover:bg-white"
          aria-label="Show accessibility options"
          onClick={() => setOpen(true)}
        >
          <Settings2 className="w-6 h-6" />
        </Button>
      )}
      {/* Popup Controls */}
      {open && (
        <div className="fixed top-4 right-4 z-50 glass-card p-4 space-y-2 shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-primary">Accessibility Options</h3>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close accessibility options"
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleHighContrast}
            className="w-full justify-start gap-2"
            aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
          >
            <Contrast className="w-4 h-4" />
            {highContrast ? 'Normal Contrast' : 'High Contrast'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLargeText}
            className="w-full justify-start gap-2"
            aria-label={`${largeText ? 'Disable' : 'Enable'} large text mode`}
          >
            <Type className="w-4 h-4" />
            {largeText ? 'Normal Text' : 'Large Text'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSound}
            className="w-full justify-start gap-2"
            aria-label={`${soundEnabled ? 'Disable' : 'Enable'} audio feedback`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </Button>
          <div className="text-xs text-muted-foreground mt-3 pt-2 border-t">
            <p><kbd>Tab</kbd> to navigate • <kbd>Space</kbd> to activate</p>
          </div>
        </div>
      )}
    </>
  );
};