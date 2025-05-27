import { useQuery } from '@tanstack/react-query';
import { getBookingById } from '../services/bookingService';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../services/bookingService';
// Hook lấy chi tiết một booking
export const useBookingById = (id) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
    enabled: !!id, // Chỉ fetch khi có id
  });
};


export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      console.log('Booking created successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to create booking:', error);
    },
  });
};