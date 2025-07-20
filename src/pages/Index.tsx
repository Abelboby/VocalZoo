import { Button } from '@/components/ui/button';
import { AnimalCard } from '@/components/AnimalCard';
import { FeatureCard } from '@/components/FeatureCard';
import { Mic, Volume2, Sparkles, Users, Trophy, Heart } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const animals = [
    { name: 'Lion', sound: 'roar', emoji: '🦁' },
    { name: 'Elephant', sound: 'trumpet', emoji: '🐘' },
    { name: 'Monkey', sound: 'chatter', emoji: '🐵' },
    { name: 'Cow', sound: 'moo', emoji: '🐄' },
  ];

  const features = [
    {
      icon: Mic,
      title: 'Voice Recognition',
      description: 'Advanced voice technology that understands children\'s speech patterns and accents.',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Volume2,
      title: 'Rich Audio Library',
      description: 'High-quality animal sounds and interactive audio cues for immersive learning.',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Sparkles,
      title: 'Magical Learning',
      description: 'Gamified experience with rewards, achievements, and delightful animations.',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Safe, educational content designed specifically for children aged 3-10.',
      gradient: 'bg-gradient-secondary'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-float">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Vocal <span className="text-gradient">Zoo</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            An interactive audio adventure where children learn by listening and speaking!
            <br />
            🎵 Hear the sound, say the animal, and watch the magic happen! ✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="animate-bounce-gentle">
              <Sparkles className="w-6 h-6" />
              Start Playing Now
            </Button>
            
            <Button variant="glass" size="xl">
              <Volume2 className="w-6 h-6" />
              Try Demo
            </Button>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 text-4xl animate-float" style={{ animationDelay: '1s' }}>
          🦁
        </div>
        <div className="absolute top-40 right-20 text-3xl animate-float" style={{ animationDelay: '2s' }}>
          🐘
        </div>
        <div className="absolute bottom-32 left-20 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>
          🐵
        </div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>
          🦋
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Try Our Animals!
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Click to hear each animal's sound, then speak their name into your microphone. 
              Perfect your pronunciation and learn new animals!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animals.map((animal, index) => (
              <div key={animal.name} style={{ animationDelay: `${index * 0.2}s` }}>
                <AnimalCard {...animal} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Why Kids Love Vocal Zoo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Educational technology that makes learning fun, interactive, and magical!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card space-y-8">
            <div className="text-6xl animate-bounce-gentle">🎮</div>
            <h2 className="text-4xl font-bold text-primary">
              Ready for an Audio Adventure?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of children already learning and having fun with Vocal Zoo!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                <Trophy className="w-6 h-6" />
                Start Free Trial
              </Button>
              
              <Button variant="glass" size="xl">
                <Heart className="w-6 h-6" />
                Learn More
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              ✨ No download required • 🔒 100% safe for kids • 🎯 Age-appropriate content
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
