import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient = 'bg-gradient-primary' 
}: FeatureCardProps) => {
  return (
    <div className="glass-card hover:scale-105 transition-all duration-300 group">
      <div className="text-center space-y-4">
        <div className={`w-16 h-16 ${gradient} rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};