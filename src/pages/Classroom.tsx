import { AnimalCard } from '@/components/AnimalCard';
import { animals } from '@/lib/animal_data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Classroom = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>{'<'} Back</Button>
          <h2 className="text-4xl font-bold text-primary mx-auto">Animal Classroom</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {animals.map((animal, index) => (
            <div key={animal.name} style={{ animationDelay: `${index * 0.1}s` }}>
              <AnimalCard {...animal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classroom; 