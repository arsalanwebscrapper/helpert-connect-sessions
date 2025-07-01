
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { ExpertProfile, ConsultationType } from '@/lib/supabase';
import { bookingService } from '@/services/bookingService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  expert: ExpertProfile;
  consultationTypes: ConsultationType[];
  onBookingComplete: () => void;
}

const BookingForm = ({ expert, consultationTypes, onBookingComplete }: BookingFormProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedConsultationType, setSelectedConsultationType] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const selectedConsultation = consultationTypes.find(ct => ct.id === selectedConsultationType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a consultation",
        variant: "destructive",
      });
      return;
    }

    if (!selectedConsultation) {
      toast({
        title: "Error",
        description: "Please select a consultation type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const scheduledAt = `${selectedDate}T${selectedTime}:00Z`;
      
      await bookingService.createBooking({
        client_id: user.id,
        expert_id: expert.id,
        consultation_type_id: selectedConsultation.id,
        scheduled_at: scheduledAt,
        duration: selectedConsultation.duration,
        total_price: selectedConsultation.price,
        notes: notes || undefined,
      });

      toast({
        title: "Success",
        description: "Your booking has been created successfully!",
      });

      onBookingComplete();
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Book Consultation
        </CardTitle>
        <CardDescription>
          Schedule a session with {expert.user?.full_name}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="consultationType">Consultation Type</Label>
            <Select value={selectedConsultationType} onValueChange={setSelectedConsultationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                {consultationTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{type.duration} minutes</span>
                      <span className="ml-2 font-semibold">${type.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Any specific topics or questions you'd like to discuss..."
            />
          </div>

          {selectedConsultation && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total:</span>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-lg font-bold">{selectedConsultation.price}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedConsultation.duration} minute session
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={loading || !selectedDate || !selectedTime || !selectedConsultationType}
          >
            {loading ? 'Booking...' : 'Book Consultation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
