import { AnimalCard } from '@/components/AnimalCard';
import { animals } from '@/lib/animal_data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Play, StopCircle } from 'lucide-react';

const ExamRoom = () => {
  const navigate = useNavigate();
  const [examMode, setExamMode] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<("success" | "retry")[]>([]);
  const [finished, setFinished] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startExam = () => {
    setExamMode(true);
    setCurrent(0);
    setScore(0);
    setResults([]);
    setFinished(false);
    setWaiting(false);
  };

  const stopExam = () => {
    setExamMode(false);
    setCurrent(0);
    setScore(0);
    setResults([]);
    setFinished(false);
    setWaiting(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleResult = (result: 'success' | 'retry') => {
    setResults(prev => [...prev, result]);
    if (result === 'success') setScore(prev => prev + 1);
    setWaiting(true);
    timeoutRef.current = setTimeout(() => {
      setWaiting(false);
      if (current + 1 < animals.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 1800);
  };

  const restartExam = () => {
    setExamMode(false);
    setCurrent(0);
    setScore(0);
    setResults([]);
    setFinished(false);
    setWaiting(false);
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Floating Exam Controls */}
      {!examMode && !finished && (
        <Button
          variant="hero"
          size="lg"
          className="fixed top-4 right-20 z-50 shadow-lg animate-zoom-in-out-slow flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          aria-label="Start oral animal exam"
          onClick={startExam}
        >
          <Play className="w-6 h-6" />
          Start Exam
        </Button>
      )}
      {examMode && !finished && (
        <Button
          variant="destructive"
          size="icon"
          className="fixed top-4 right-20 z-50 shadow-lg"
          aria-label="Stop exam"
          onClick={stopExam}
        >
          <StopCircle className="w-6 h-6" />
        </Button>
      )}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>{'<'} Back</Button>
          <h2 className="text-4xl font-bold text-primary mx-auto">Animal Exam Room</h2>
        </div>
        {/* Exam Slideshow or Results */}
        {examMode && !finished ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <AnimalCard
              key={animals[current].name}
              {...animals[current]}
              autoPlay
              onResult={waiting ? undefined : handleResult}
              playButtonDisabled={waiting}
              examAutomation={true}
            />
            <div className="mt-6 text-lg text-primary font-semibold">{`Question ${current + 1} of ${animals.length}`}</div>
            <div className="mt-2 text-md text-muted-foreground">Score: {score}</div>
          </div>
        ) : finished ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <div className="text-6xl animate-bounce-gentle">🎉</div>
            <h3 className="text-3xl font-bold text-primary">Exam Complete!</h3>
            <div className="text-2xl font-semibold text-success">Your Score: {score} / {animals.length}</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {results.map((r, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-white ${r === 'success' ? 'bg-success' : 'bg-accent'}`}>{animals[i].name}: {r === 'success' ? '✔️' : '❌'}</span>
              ))}
            </div>
            <Button variant="hero" size="lg" onClick={restartExam}>Restart Exam</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animals.map((animal, index) => (
              <div key={animal.name} style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimalCard {...animal} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamRoom; 