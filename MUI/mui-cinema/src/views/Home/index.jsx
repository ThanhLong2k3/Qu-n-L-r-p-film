import Banner from "./banner"
import BannerSlider from "./BannerSlider"
import ComingSoon from "./ComingSoon"
import EventCard from "./EventCard"
import MovieCard from "./MovieCard"
import NowPlaying from "./NowPlaying"
import Subscribe from "./Subscribe"

const Home = () => {
  return (
    <div>
      <BannerSlider/>
      <NowPlaying/>
      <MovieCard/>
      <Banner/>
      <ComingSoon/>
      <EventCard/>
      <Subscribe/>
    </div>
  )
}

export default Home
