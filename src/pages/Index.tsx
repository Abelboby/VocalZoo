import { Button } from '@/components/ui/button';
import { AnimalCard } from '@/components/AnimalCard';
import { FeatureCard } from '@/components/FeatureCard';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { Mic, Volume2, Sparkles, Users, Trophy, Heart, Eye, Ear, Brain, Hand, GraduationCap, ClipboardList } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
import { animals } from '@/lib/animal_data';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const previewAnimals = animals.slice(0, 4);

  const features = [
    {
      icon: Eye,
      title: 'Visual Accessibility',
      description: 'High contrast mode, large text options, and screen reader support for visually impaired children.',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Ear,
      title: 'Audio-First Design',
      description: 'Rich audio cues, sound descriptions, and vibration feedback for hearing impaired children.',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Brain,
      title: 'Cognitive Support',
      description: 'Simple instructions, predictable patterns, and repetition-friendly for children with learning differences.',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Hand,
      title: 'Motor Accessibility',
      description: 'Large touch targets, keyboard navigation, and voice control for children with motor impairments.',
      gradient: 'bg-gradient-secondary'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Skip Navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      
      <AccessibilityControls />
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
            An inclusive audio adventure designed for ALL children to learn and play together!
            <br />
            🌟 Accessible • Voice-First • Screen Reader Friendly • Fun for Everyone! 🌟
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
      <main id="main-content">
        <section className="py-20 px-6" aria-label="Animal Learning Activities">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-primary mb-6">
                Interactive Animal Learning
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Each animal card helps children learn through listening and speaking. Accessible for screen readers, keyboard navigation, and voice control.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>🎧 Use headphones for the best experience • 🎤 Speak clearly into your microphone</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="glass-card flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in" onClick={() => navigate('/classroom')} tabIndex={0} role="button" aria-label="Go to Training Room" onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/classroom'); }}>
                <GraduationCap className="text-primary w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">Training Room</h3>
                <p className="text-muted-foreground text-lg text-center mb-4">Learn animal sounds with guided listening. Accessible for blind students.</p>
                <Button variant="hero" size="lg">Enter Training Room</Button>
              </div>
              <div className="glass-card flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in" onClick={() => navigate('/exam')} tabIndex={0} role="button" aria-label="Go to Exam Room" onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/exam'); }}>
                <ClipboardList className="text-primary w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">Exam Room</h3>
                <p className="text-muted-foreground text-lg text-center mb-4">Test your knowledge by guessing animal sounds. Accessible for blind students.</p>
                <Button variant="hero" size="lg">Enter Exam Room</Button>
              </div>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Inclusive Learning for Every Child
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed with accessibility at its core, ensuring every child can participate, learn, and have fun together!
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
      </main>
    </div>
  );
};

export default Index;
