import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/enhanced-button';
import { Event } from '@/store/eventStore';

interface EventCardProps {
  event: Event;
  onEdit?: () => void;
  onView?: () => void;
}

export function EventCard({ event, onEdit, onView }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusVariant = (status: Event['status']) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const attendeeCount = event.attendees.length;
  const attendanceRate = (attendeeCount / event.maxAttendees) * 100;

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {event.description}
            </p>
          </div>
          <Badge variant={getStatusVariant(event.status)} className="ml-2">
            {event.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 mr-2 ml-4 text-primary" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Users className="w-4 h-4 mr-2 text-primary" />
              <span>{attendeeCount} / {event.maxAttendees} attendees</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {event.category}
            </Badge>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(attendanceRate, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        {onView && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onView}
            className="flex-1"
          >
            View Details
          </Button>
        )}
        {onEdit && (
          <Button 
            variant="gradient" 
            size="sm" 
            onClick={onEdit}
            className="flex-1"
          >
            Edit Event
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}