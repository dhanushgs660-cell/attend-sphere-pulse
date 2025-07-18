import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEventStore } from '@/store/eventStore';
import { Calendar, Clock, MapPin, Users, Tag, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be less than 200 characters'),
  category: z.string().min(1, 'Category is required'),
  maxAttendees: z.number().min(1, 'Must allow at least 1 attendee').max(10000, 'Maximum 10,000 attendees allowed'),
  status: z.enum(['draft', 'published'])
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const categories = [
  'Technology',
  'Business',
  'Marketing',
  'Design',
  'Health',
  'Education',
  'Entertainment',
  'Sports',
  'Food & Drink',
  'Travel',
  'Other'
];

export function EventForm({ onSuccess, onCancel }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addEvent } = useEventStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'draft',
      maxAttendees: 50
    }
  });

  const selectedCategory = watch('category');
  const selectedStatus = watch('status');

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addEvent(data);
      
      toast({
        title: "Event created successfully!",
        description: `${data.title} has been ${data.status === 'published' ? 'published' : 'saved as draft'}.`,
      });

      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error creating event",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Event</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your event.
        </p>
      </div>

      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Event Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter event title"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe your event"
                rows={4}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  {...register('date')}
                  className={errors.date ? 'border-destructive' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  {...register('time')}
                  className={errors.time ? 'border-destructive' : ''}
                />
                {errors.time && (
                  <p className="text-sm text-destructive">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location *
              </Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Enter event location"
                className={errors.location ? 'border-destructive' : ''}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            {/* Category and Max Attendees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Category *
                </Label>
                <Select onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttendees" className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Max Attendees *
                </Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  {...register('maxAttendees', { valueAsNumber: true })}
                  placeholder="50"
                  min="1"
                  max="10000"
                  className={errors.maxAttendees ? 'border-destructive' : ''}
                />
                {errors.maxAttendees && (
                  <p className="text-sm text-destructive">{errors.maxAttendees.message}</p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select onValueChange={(value) => setValue('status', value as 'draft' | 'published')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Save as Draft</SelectItem>
                  <SelectItem value="published">Publish Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="submit" 
                variant="gradient" 
                size="lg" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>Creating...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {selectedStatus === 'published' ? 'Create & Publish' : 'Save as Draft'}
                  </>
                )}
              </Button>
              
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}