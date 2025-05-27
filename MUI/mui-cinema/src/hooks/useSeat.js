import { useQuery } from '@tanstack/react-query';
import {  getSeatsByShowtime } from '../services/seatService';

export const useSeatsByShowtime = (showtimeId) => {
  return useQuery(
    ['seats', showtimeId], 
    () => getSeatsByShowtime(showtimeId),
    { enabled: !!showtimeId }
  );
};
