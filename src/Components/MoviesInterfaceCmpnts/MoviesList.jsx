import MovieListSkeleton from "../Skeleton/MovieListSkeleton";
import { BASE_URL_IMAGE } from "@/Constants";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux-toolkit/slices/cartSlice";
import {
  setVoteRange,
  setVoteAverage,
  resetFilters,
} from "@/redux-toolkit/slices/filterSlice";
import MoviesCard from "./MoviesCard";
import HeaderMenu from "./HeaderMenu";
import CustomPagination from "@/Components/reusable-components/CustomPagination";
import useFetchMovies from "@/hooks/useFetchMovies";

const MoviesList = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    filteredMovies,
    currentPage,
    setCurrentPage,
    currentPosts,
    totalPages,
  } = useFetchMovies();

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleVoteCountChange = (range) => {
    dispatch(setVoteRange(range));
  };
  const handleVoteAverageChange = (range) => {
    dispatch(setVoteAverage(range));
  };

  return (
    <>
      <HeaderMenu
        onCountChange={handleVoteCountChange}
        onAverageChange={handleVoteAverageChange}
        resetFilters={() => {
          dispatch(resetFilters());
          setCurrentPage(1);
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <MovieListSkeleton key={index} />
            ))
          : filteredMovies &&
            currentPosts.map((movie, index) => (
              <MoviesCard
                key={index}
                id={movie.id}
                moviesImage={`${BASE_URL_IMAGE}${movie.poster_path}`}
                movieTitle={movie.original_title}
                releaseDate={movie.release_date}
                onclick={() => dispatch(addToCart(movie))}
              />
            ))}
      </div>
      <CustomPagination
        currentPage={currentPage}
        onPageChange={handlePageClick}
        totalPages={totalPages}
      />
    </>
  );
};

export default MoviesList;
