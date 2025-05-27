import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSeatsByShowtime } from '../../services/showtimeService';
import { Button, Grid, Box, Paper, Typography, Divider, List, ListItem, ListItemButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCreateBooking } from '../../hooks/useBooking'; // Import useCreateBooking
import { getDiscountByCode } from '../../services/discountService'; // Giả sử bạn đã tạo service này
import { useNavigate } from 'react-router-dom';

const SeatBooking = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [total, setTotal] = useState(0);
  const [cocaQuantity, setCocaQuantity] = useState(0);
  const [popcornQuantity, setPopcornQuantity] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  // Tạo booking mới khi thanh toán
  const { mutate: createBooking } = useCreateBooking();

  const combineSeats = (apiSeats) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const vipSeats = [
      ...['C', 'D'].flatMap(row =>
        Array.from({ length: 6 }, (_, i) => `${row}${i + 3}`)
      ),
    ];
    return rows.flatMap((row) =>
      columns.map((col) => {
        const seatFromApi = apiSeats.find((seat) => seat.seatNumber === `${row}${col}`);
        return {
          id: `${row}${col}`,
          price: seatFromApi ? seatFromApi.seatType.price : row === 'A' || row === 'B' ? 15 : 10,
          status: seatFromApi ? seatFromApi.status : 'available',
          isVip: vipSeats.includes(`${row}${col}`),
        };
      })
    );
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const data = await getSeatsByShowtime(showtimeId);
        console.log("Dữ liệu ghế từ API:", data); // Kiểm tra dữ liệu ghế từ API
        const combinedSeats = combineSeats(data);
        console.log("Ghế sau khi kết hợp:", combinedSeats); // Kiểm tra ghế sau khi kết hợp
        setSeats(combinedSeats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [showtimeId]);

  const handleSeatSelect = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && seat.status === 'booked') {
      alert(`Ghế ${seatId} đã bị đặt, vui lòng chọn ghế khác.`);
      return; // Không cho phép chọn ghế đã đặt
    }

    setSelectedSeats((prevSelected) => {
      const updatedSeats = prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId];

      const newTotalPrice = updatedSeats.reduce((total, id) => {
        const seat = seats.find((seat) => seat.id === id);
        return total + (seat ? seat.price : 0);
      }, 0);
      setTotal(newTotalPrice);

      return updatedSeats;
    });
  };

  const handlePopcornIncrease = () => setPopcornQuantity((prev) => prev + 1);
  const handlePopcornDecrease = () => setPopcornQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleCocaIncrease = () => setCocaQuantity((prev) => prev + 1);
  const handleCocaDecrease = () => setCocaQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const cocaPrice = 50000;
  const popcornPrice = 30000;

  const handleApplyDiscount = async () => {
    try {
      const response = await getDiscountByCode(discountCode); // Gọi API kiểm tra mã giảm giá
      if (response) {
        setDiscountAmount(response.discountAmount); // Cập nhật discountAmount
        setDiscountError('');
        console.log("Discount Amount:", response.discountAmount); // Kiểm tra giá trị discountAmount
      }
    } catch (error) {
      setDiscountError('Mã giảm giá không hợp lệ hoặc đã hết hạn', error);
      setDiscountAmount(0);
    }
  };

  const handleBooking = () => {
    const bookingData = {
      showtime: showtimeId, // Lấy showtimeId từ params
      seats: selectedSeats.map(seatId => {
        const seat = seats.find(s => s.id === seatId);
        return seat ? { seatNumber: seat.id } : null; // Chỉ gửi seatNumber
      }).filter(seat => seat !== null),
      foods: [
        { food: "6761fd6e67316cf2e20e2279", quantity: popcornQuantity },
        { food: "676966fdac2fea7c284cfffc", quantity: cocaQuantity },
      ],
      discountCode: discountCode, // Gửi mã giảm giá, không phải discountAmount
    };
  
    if (bookingData.seats.length === 0) {
      alert('Không có ghế hợp lệ để đặt!');
      return;
    }
  
    console.log("Dữ liệu gửi đi khi tạo booking:", bookingData);
  
    // Gọi API để tạo booking
    createBooking(bookingData, {
      onSuccess: (response) => {
        alert('Booking đã được tạo thành công!');
        console.log('Booking đã được tạo thành công:', response);
        navigate(`/ticket/${response._id}`);
      },
      onError: (error) => {
        console.error('Không thể tạo booking:', error);
        alert('Không thể tạo booking. Vui lòng thử lại.');
      },
    });
  };

  if (loading) return <div>Đang tải danh sách ghế...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  const numRows = 6;
  const numSeatsPerRow = 10;
  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    seats.slice(rowIndex * numSeatsPerRow, (rowIndex + 1) * numSeatsPerRow)
  );

  // Tính tổng tiền sau giảm giá
  const totalSeatPrice = total; // Tổng tiền ghế
  const totalFoodPrice = popcornQuantity * popcornPrice + cocaQuantity * cocaPrice; // Tổng tiền bắp và coca
  const totalBeforeDiscount = totalSeatPrice + totalFoodPrice; // Tổng tiền trước khi áp dụng giảm giá
  const finalPrice = discountAmount > 0 
  ? totalBeforeDiscount * (1 - discountAmount / 100)
  : totalBeforeDiscount;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 2, margin: '50px', marginTop: '100px' }}>
      <Box sx={{ flex: 2, maxWidth: '60%' }}>
        <Paper elevation={3} sx={{ padding: 2, maxHeight: 500, overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }} align="center">
            Màn hình
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body2" align="center" sx={{ marginBottom: 2, fontStyle: 'italic' }}>
            (Vui lòng chọn ghế phía dưới)
          </Typography>
          <Grid container spacing={1}>
            {rows.map((row, rowIndex) => (
              <Grid item xs={12} key={rowIndex}>
                <List sx={{ display: 'flex', justifyContent: 'center' }}>
                  {row.map((seat) => (
                    <ListItem key={seat.id} sx={{ padding: 0 }}>
                    <ListItemButton
  onClick={() => handleSeatSelect(seat.id)}
  sx={{
    backgroundColor: selectedSeats.includes(seat.id)
      ? theme.palette.primary.main
      : seat.status === "booked"
      ? theme.palette.error.main // Màu đỏ cho ghế đã đặt
      : seat.isVip
      ? theme.palette.warning.light // Màu riêng cho ghế VIP
      : theme.palette.grey[400],
    color: "white",
    margin: 0.3,
    width: 35,
    height: 35,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    position: "relative",
    "&::after": seat.status === "booked" && {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "2px",
      backgroundColor: "white",
      transform: "rotate(45deg)",
      top: "50%",
      left: "0",
    },
  }}
  disabled={seat.status === "booked"} // Vô hiệu hóa ghế đã đặt
>
  {seat.id}
</ListItemButton>


                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      <Box sx={{ flex: 1, maxWidth: '35%' }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Thanh toán
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body2">
            <strong>Ghế đã chọn:</strong> {selectedSeats.join(', ') || 'Chưa chọn'}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>Tổng tiền ghế: {totalSeatPrice}VND</Typography>
          <Divider sx={{ marginBottom: 2, marginTop: 2 }} />

          <Box>
            <Typography variant="body2">Bắp rang</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Button onClick={handlePopcornDecrease}>-</Button>
              <Typography sx={{ marginX: 2 }}>{popcornQuantity}</Typography>
              <Button onClick={handlePopcornIncrease}>+</Button>
              <Typography sx={{ marginLeft: 2 }}>{(popcornQuantity * popcornPrice)}VND</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2">Coca</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Button onClick={handleCocaDecrease}>-</Button>
              <Typography sx={{ marginX: 2 }}>{cocaQuantity}</Typography>
              <Button onClick={handleCocaIncrease}>+</Button>
              <Typography sx={{ marginLeft: 2 }}>{(cocaQuantity * cocaPrice)}VND</Typography>
            </Box>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2">Mã giảm giá</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Nhập mã giảm giá"
                style={{
                  padding: '5px',
                  marginRight: '10px',
                  width: '150px',
                }}
              />
              <Button onClick={handleApplyDiscount} variant="outlined">
                Áp dụng
              </Button>
            </Box>
            {discountError && (
              <Typography color="error" variant="body2">
                {discountError}
              </Typography>
            )}
          </Box>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Tổng tiền (đã giảm giá): {finalPrice.toFixed(2)} VND
          </Typography>

          <Button
            onClick={handleBooking}
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Đặt vé
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default SeatBooking;
  