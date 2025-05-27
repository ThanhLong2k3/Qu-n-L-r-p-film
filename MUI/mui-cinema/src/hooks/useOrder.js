import { useQuery, useMutation } from '@tanstack/react-query';
import useOrderStore from '../store/orderStore';

// Hook để lấy thông tin đơn hàng theo ID
export const useOrderById = (id) => {
  const { fetchOrderById } = useOrderStore();

  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id, // Chỉ gọi khi có id
  });
};

// Hook để tạo đơn hàng mới
export const useCreateOrder = () => {
  const { createOrder } = useOrderStore();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log('Order created successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to create order:', error);
    },
  });

  return mutation;
};
