
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { bookingService } from '@/services/bookingService';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const UserDashboard = () => {
  const { user, userProfile } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['userBookings', user?.id],
    queryFn: () => user ? bookingService.getUserBookings(user.id, 'client') : [],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your dashboard.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {userProfile?.full_name}!</h2>
          <p className="text-gray-600">Manage your consultations and appointments</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Your Bookings
            </CardTitle>
            <CardDescription>
              {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No bookings yet</p>
                <Button asChild>
                  <a href="/experts">Find an Expert</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {booking.expert?.user?.full_name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{booking.expert?.user?.full_name}</h4>
                            <p className="text-sm text-gray-600">{booking.expert?.specialization}</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(new Date(booking.scheduled_at), 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {format(new Date(booking.scheduled_at), 'HH:mm')} ({booking.duration} min)
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold">${booking.total_price}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">"{booking.notes}"</p>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        
                        {booking.meeting_link && booking.status === 'confirmed' && (
                          <Button size="sm" asChild>
                            <a href={booking.meeting_link} target="_blank" rel="noopener noreferrer">
                              Join Meeting
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
