import { Calendar, BarChart3, Users, Settings, Plus, Home } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const navigation = [
  { name: 'Dashboard', icon: Home, key: 'dashboard' },
  { name: 'Events', icon: Calendar, key: 'events' },
  { name: 'Attendees', icon: Users, key: 'attendees' },
  { name: 'Analytics', icon: BarChart3, key: 'analytics' },
  { name: 'Settings', icon: Settings, key: 'settings' },
];

export function Sidebar({ activeTab, onTabChange, className }: SidebarProps) {
  return (
    <div className={cn(
      "w-64 bg-card border-r border-border h-full flex flex-col shadow-card",
      className
    )}>
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AttendSphere</h1>
            <p className="text-xs text-muted-foreground">Event Management</p>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b border-border">
        <Button 
          variant="gradient" 
          className="w-full" 
          onClick={() => onTabChange('create-event')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => onTabChange(item.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>© 2024 AttendSphere</p>
          <p>Built with ❤️ for events</p>
        </div>
      </div>
    </div>
  );
}