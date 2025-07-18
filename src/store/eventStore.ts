import { create } from 'zustand';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  maxAttendees: number;
  attendees: Attendee[];
  createdAt: string;
  status: 'draft' | 'published' | 'cancelled';
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface EventStore {
  events: Event[];
  selectedEvent: Event | null;
  isLoading: boolean;
  
  // Actions
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'attendees'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setSelectedEvent: (event: Event | null) => void;
  addAttendee: (eventId: string, attendee: Omit<Attendee, 'id' | 'registeredAt'>) => void;
  removeAttendee: (eventId: string, attendeeId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring the latest innovations in AI, web development, and cloud computing.',
      date: '2024-08-15',
      time: '09:00',
      location: 'San Francisco Convention Center',
      category: 'Technology',
      maxAttendees: 500,
      attendees: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          registeredAt: '2024-07-01T10:00:00Z',
          status: 'confirmed'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          registeredAt: '2024-07-05T14:30:00Z',
          status: 'confirmed'
        }
      ],
      createdAt: '2024-06-15T09:00:00Z',
      status: 'published'
    },
    {
      id: '2',
      title: 'Digital Marketing Workshop',
      description: 'Learn the latest digital marketing strategies and tools to grow your business online.',
      date: '2024-08-22',
      time: '14:00',
      location: 'Downtown Business Hub',
      category: 'Marketing',
      maxAttendees: 50,
      attendees: [
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          registeredAt: '2024-07-10T09:15:00Z',
          status: 'confirmed'
        }
      ],
      createdAt: '2024-06-20T11:00:00Z',
      status: 'published'
    }
  ],
  selectedEvent: null,
  isLoading: false,

  addEvent: (eventData) => set((state) => ({
    events: [...state.events, {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      attendees: []
    }]
  })),

  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    )
  })),

  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(event => event.id !== id),
    selectedEvent: state.selectedEvent?.id === id ? null : state.selectedEvent
  })),

  setSelectedEvent: (event) => set({ selectedEvent: event }),

  addAttendee: (eventId, attendeeData) => set((state) => ({
    events: state.events.map(event => 
      event.id === eventId 
        ? {
            ...event,
            attendees: [...event.attendees, {
              ...attendeeData,
              id: Date.now().toString(),
              registeredAt: new Date().toISOString()
            }]
          }
        : event
    )
  })),

  removeAttendee: (eventId, attendeeId) => set((state) => ({
    events: state.events.map(event => 
      event.id === eventId
        ? {
            ...event,
            attendees: event.attendees.filter(attendee => attendee.id !== attendeeId)
          }
        : event
    )
  })),

  setLoading: (loading) => set({ isLoading: loading })
}));