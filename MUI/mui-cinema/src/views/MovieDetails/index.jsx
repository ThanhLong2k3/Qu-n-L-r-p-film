import Banner from "./Banner"
import InforMovie from "./InforMovie"
import MoreMovies from "./MoreMovies"
import MovieHeader from "./MovieHeader"
import MovieMedia from "./MovieMedia"
import StoryLine from "./StoryLine"
import TopCast from "./TopCast"

const MovieDetails = () => {
  return (
    <div>
      <Banner/>
      <MovieHeader/>
      <MovieMedia/>
      <InforMovie/>
      <TopCast/>
      <StoryLine/>
      <MoreMovies/>
    </div>
  )
}

export default MovieDetails
