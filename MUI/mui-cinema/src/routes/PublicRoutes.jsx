import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../views/Home";
import Movie from "../views/Movie";
import MovieDetails from "../views/MovieDetails";
import SeatBooking from "../views/Seat";
import Ticket from "../views/Ticket";
import Thanks from "../views/Thanks";
import Account from "../views/Account";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/movie" element={<Movie/>} />
        <Route path="/moviedetails/:id" element={<MovieDetails/>} />
        <Route path="/seatbooking/:showtimeId" element={<SeatBooking/>} />
        <Route path="/ticket/:id" element={<Ticket/>} />
        <Route path="/thanks" element={<Thanks/>} />
        <Route path="/account" element={<Account/>} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
