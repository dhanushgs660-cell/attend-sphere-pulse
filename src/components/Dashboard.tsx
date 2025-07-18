import { useState } from 'react';
import { EventCard } from './EventCard';
import { useEventStore } from '@/store/eventStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users, TrendingUp, Calendar } from 'lucide-react';

export function Dashboard() {
  const { events } = useEventStore();
  
  const totalEvents = events.length;
  const publishedEvents = events.filter(e => e.status === 'published').length;
  const totalAttendees = events.reduce((acc, event) => acc + event.attendees.length, 0);
  const avgAttendeesPerEvent = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;

  const recentEvents = events
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: Calendar,
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Published Events',
      value: publishedEvents,
      icon: CalendarDays,
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Total Attendees',
      value: totalAttendees,
      icon: Users,
      trend: '+23%',
      trendUp: true
    },
    {
      title: 'Avg. Attendees',
      value: avgAttendeesPerEvent,
      icon: TrendingUp,
      trend: '+5%',
      trendUp: true
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your events.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.trendUp ? 'text-success' : 'text-destructive'} flex items-center mt-1`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onView={() => console.log('View event:', event.id)}
                  onEdit={() => console.log('Edit event:', event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground">
                Create your first event to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}