import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEventStore } from '@/store/eventStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, Users, TrendingUp, Target } from 'lucide-react';

export function Analytics() {
  const { events } = useEventStore();

  // Event data by category
  const categoryData = events.reduce((acc, event) => {
    const category = event.category;
    const existing = acc.find(item => item.category === category);
    if (existing) {
      existing.count += 1;
      existing.attendees += event.attendees.length;
    } else {
      acc.push({
        category,
        count: 1,
        attendees: event.attendees.length
      });
    }
    return acc;
  }, [] as { category: string; count: number; attendees: number }[]);

  // Event status distribution
  const statusData = [
    { name: 'Published', value: events.filter(e => e.status === 'published').length, color: '#8b5cf6' },
    { name: 'Draft', value: events.filter(e => e.status === 'draft').length, color: '#06b6d4' },
    { name: 'Cancelled', value: events.filter(e => e.status === 'cancelled').length, color: '#ef4444' }
  ].filter(item => item.value > 0);

  // Monthly trend (mock data for demo)
  const monthlyData = [
    { month: 'Jan', events: 5, attendees: 120 },
    { month: 'Feb', events: 8, attendees: 180 },
    { month: 'Mar', events: 12, attendees: 250 },
    { month: 'Apr', events: 10, attendees: 200 },
    { month: 'May', events: 15, attendees: 320 },
    { month: 'Jun', events: 18, attendees: 450 }
  ];

  const totalEvents = events.length;
  const totalAttendees = events.reduce((acc, event) => acc + event.attendees.length, 0);
  const avgAttendance = totalEvents > 0 ? (totalAttendees / totalEvents).toFixed(1) : '0';
  const totalCapacity = events.reduce((acc, event) => acc + event.maxAttendees, 0);
  const utilizationRate = totalCapacity > 0 ? ((totalAttendees / totalCapacity) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and performance metrics for your events.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-foreground">{totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold text-foreground">{totalAttendees}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                <p className="text-2xl font-bold text-foreground">{avgAttendance}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Utilization Rate</p>
                <p className="text-2xl font-bold text-foreground">{utilizationRate}%</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Events by Category */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Events by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Status Distribution */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Event Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="events" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))' }}
                name="Events"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="attendees" 
                stroke="hsl(var(--primary-glow))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary-glow))' }}
                name="Attendees"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}