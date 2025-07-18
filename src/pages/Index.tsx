import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { EventsList } from '@/components/EventsList';
import { EventForm } from '@/components/EventForm';
import { Analytics } from '@/components/Analytics';

const Index = () => {
  const [currentView, setCurrentView] = useState('hero');

  const handleGetStarted = () => setCurrentView('dashboard');
  const handleTabChange = (tab: string) => setCurrentView(tab);
  const handleCreateEvent = () => setCurrentView('create-event');
  const handleEditEvent = () => setCurrentView('create-event');
  const handleEventSuccess = () => setCurrentView('events');
  const handleEventCancel = () => setCurrentView('events');

  if (currentView === 'hero') {
    return <HeroSection onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={currentView} onTabChange={handleTabChange} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'events' && <EventsList onCreateEvent={handleCreateEvent} onEditEvent={handleEditEvent} />}
          {currentView === 'create-event' && <EventForm onSuccess={handleEventSuccess} onCancel={handleEventCancel} />}
          {currentView === 'analytics' && <Analytics />}
        </div>
      </main>
    </div>
  );
};

export default Index;
