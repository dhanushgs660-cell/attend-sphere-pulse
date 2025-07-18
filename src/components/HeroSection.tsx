import { ArrowRight, Calendar, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import heroImage from '@/assets/hero-event.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Create Amazing
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform to manage, promote, and track your events. 
            From intimate workshops to large conferences - we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              className="group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Scheduling</h3>
              <p className="text-white/80 text-sm text-center">
                AI-powered scheduling that finds the perfect time for your events
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Attendee Management</h3>
              <p className="text-white/80 text-sm text-center">
                Effortlessly manage registrations, check-ins, and communications
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Analytics</h3>
              <p className="text-white/80 text-sm text-center">
                Track engagement, attendance, and ROI with detailed insights
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-primary rounded-full opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/20 rounded-full opacity-40 animate-pulse-glow" style={{ animationDelay: '2s' }} />
    </div>
  );
}