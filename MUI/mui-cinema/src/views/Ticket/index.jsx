import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Divider} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getBookingById } from "../../services/bookingService";
import axios from 'axios';

// Hàm định dạng tiền VND
const formatCurrency = (value) => {
  return value?.toLocaleString('vi-VN'); // Định dạng tiền tệ theo kiểu Việt Nam
};

const Ticket = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [booking, setBooking] = useState(null); // Lưu thông tin booking
  const [loading, setLoading] = useState(true); // Kiểm tra trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu có
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Trạng thái thanh toán thành công
  const navigate = useNavigate(); // Hook để điều hướng

  // Fetch booking data từ API
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const data = await getBookingById(id); // Lấy booking theo ID từ API
        setBooking(data);
      } catch (err) {
        setError("Không thể tải thông tin vé!", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]);

  // Nếu đang tải hoặc có lỗi
  if (loading) return <div>Đang tải thông tin vé...</div>;
  if (error) return <div>{error}</div>;

  // Kiểm tra xem booking và showtime có dữ liệu không
  if (!booking || !booking.booking || !booking.booking.showtime) {
    return <div>Không có thông tin vé.</div>;
  }

  const { showtime, seats, foods, subtotal, discount, total } = booking.booking;

  // Dữ liệu để tạo mã QR (bao gồm tài khoản ngân hàng và số tiền cần thanh toán)
  const qrData = {
    accountNumber: "1028654340", // Số tài khoản ngân hàng của bạn
    bankName: "Vietcombank",    // Tên ngân hàng
    amount: total,              // Tổng tiền cần thanh toán
    currency: "VND",            // Tiền tệ
    description: `Thanh toán vé xem phim ${showtime.title}`, // Mô tả giao dịch
  };

  // Chuyển đổi dữ liệu thành chuỗi JSON để tạo mã QR
  const qrString = JSON.stringify(qrData);

  // Giả lập thanh toán thành công và chuyển hướng
  const handlePaymentSuccess = async () => {
    const transactionId = `txn_${Math.random().toString(36).substr(2, 9)}`; // Tạo mã giao dịch ngẫu nhiên
    setPaymentSuccess(true); // Đánh dấu thanh toán thành công
    try {
      // Gửi yêu cầu tạo đơn hàng
      const response = await axios.post('http://localhost:3000/api/orders', {
        bookingId: id, // Sử dụng bookingId từ URL
        transactionId: transactionId,
      });

      console.log('Order created successfully:', response.data);
      // Chuyển hướng về trang "thanks" sau 3 giây
      setTimeout(() => {
        navigate("/thanks");
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Có lỗi xảy ra khi tạo đơn hàng.');
    }
  };

  return (
    <Box px={27} py={15}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Confirmation and Payment
      </Typography>

      <Box display="flex" gap={12}>
        {/* Left Section: Ticket Summary */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 600, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <Box mt={1}>
                    <Typography
                      component="a"
                      href="#"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                        fontWeight: "bold",
                      }}
                    >
                      {showtime.title} {/* Tên phim */}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                      Date: {showtime.time}
                    </Typography>

                    <Typography variant="body1" sx={{ fontSize: "12px", color: "text.secondary" }}>
                      Seats: {seats.map((seat) => seat.seatNumber).join(", ")}{" "}
                      {/* Ghế ngồi */}
                    </Typography>

                    {/* Thực phẩm */}
                    {foods.map(
                      (foodItem, index) =>
                        foodItem.quantity > 0 && (
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "text.secondary" }}
                            key={index}
                          >
                            {foodItem.food} x {foodItem.quantity} - VND{" "}
                            {formatCurrency(foodItem.quantity * foodItem.price)}{" "}
                            {/* Tính giá thực phẩm */}
                          </Typography>
                        )
                    )}
                    <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                      Theater: {showtime.theater} {/* Rạp chiếu */}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: "none" }}>
                  <Box mt={1}>
                    {/* Hiển thị giá tiền */}
                    <Typography variant="body1" sx={{ fontSize: "12px", color: "text.secondary" }}>
                      {formatCurrency(total)} VND {/* Tổng số tiền */}
                    </Typography>
                    {foods?.map(
                      (foodItem, index) =>
                        foodItem?.quantity > 0 && (
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "text.secondary" }}
                            key={index}
                          >
                            {formatCurrency(foodItem?.quantity * foodItem?.price)} VND
                          </Typography>
                        )
                    )}
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} sx={{ padding: 0 }}>
                  <Divider />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontSize: "12px", color: "text.secondary", borderRight: "1px solid rgba(224, 224, 224, 1)", paddingY: 0.5 }}>
                  <Typography variant="body2">Subtotal</Typography>
                </TableCell>
                <TableCell align="right" sx={{ paddingY: 0.5 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", color: "text.secondary" }}>
                    {formatCurrency(subtotal)} VND {/* Tổng phụ */}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontSize: "12px", color: "text.secondary", borderRight: "1px solid rgba(224, 224, 224, 1)", paddingY: 0.5 }}>
                  <Typography variant="body2">Discount</Typography>
                </TableCell>
                <TableCell align="right" sx={{ paddingY: 0.5 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", color: "text.secondary" }}>
                    {formatCurrency(discount || 0)} VND {/* Giảm giá */}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontSize: "12px", color: "text.secondary", borderRight: "1px solid rgba(224, 224, 224, 1)", paddingY: 0.5 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ paddingY: 0.5 }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: "12px", color: "text.secondary" }}>
                    {formatCurrency(total)} VND
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Right Section: QR Code or Success Message */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          component={Paper}
          sx={{
            width: 300,
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {paymentSuccess ? (
            <>
              <Typography variant="h6" fontWeight="bold">
                Thanh toán thành công!
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "text.secondary", marginTop: 1 }}>
                Thanh toán đã được xử lý. Chờ chuyển hướng...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight="bold">
                Scan to Pay
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "text.secondary", marginTop: 1 }}>
                Ngân hàng: {qrData.bankName}
              </Typography>
              <Box
                mt={2}
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#e0e0e0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <QRCode value={qrString} size={128} />
              </Box>
              <Typography variant="body2" sx={{ fontSize: "12px", color: "text.secondary" }} mt={2}>
                Sử dụng ứng dụng di động của bạn để quét mã QR và tiến hành thanh toán.
              </Typography>
              <Box mt={3}>
                <button onClick={handlePaymentSuccess}>Quét mã QR để thanh toán</button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Ticket;
