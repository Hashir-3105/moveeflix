import React, { useEffect, useMemo, useState } from 'react'
// import MoviesCard from './MoviesCard';
import CustomPagination from '../../Hooks/CustomPagination';
import MovieListSkeleton from '../Skeleton/MovieListSkeleton';
import HeaderMenu from './HeaderMenu';
import { BASE_URL, BASE_URL_IMAGE } from '@/Constants';
import { useDispatch , useSelector } from 'react-redux'
import { addToCart } from '@/redux-toolkit/slices/cartSlice';
import { setVoteRange , setVoteAverage , resetFilters } from '@/redux-toolkit/slices/filterSlice';
import MoviesCard from './MoviesCard';
import HeaderNavigationMenu from './HeaderNavigationMenu';

const MoviesList = () => {
    const [allMovies, setAllMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters)
    const API_KEY = import.meta.env.VITE_API_KEY

    useEffect(() => {
        async function moviesList() {
            try {
                setIsLoading(true)
                const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
                const moviesData = await response.json();
                console.log(moviesData.results);
                setAllMovies(moviesData.results)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        moviesList();
    }, []);

    const filteredMovies = useMemo(() => {
        const result = allMovies
            .filter((movie) =>
                movie.original_title.toLowerCase().includes(filters.searchItem.toLowerCase())
            ).filter((movie) => {
                const voteCount = movie.vote_count;
                if (filters.voteRange === '1-500') return voteCount >= 1 && voteCount <= 500;
                if (filters.voteRange === '501-1000') return voteCount >= 501 && voteCount <= 1000;
                if (filters.voteRange === '1000+') return voteCount > 1000
                return true;
            }).filter((movie) => {
                const voteAverage = movie.vote_average;
                if (filters.voteAverage === '1-5') return voteAverage >= 1 && voteAverage <= 5;
                if (filters.voteAverage === '5+') return voteAverage > 5;
                return true;
            })
        console.log('Filtering from original movies:', allMovies.length);
        console.log('Current filters:', filters);
        return result;

    }, [allMovies, filters])

    const postPerPage = 8;
    const totalPages = Math.ceil(filteredMovies.length / postPerPage)

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPosts = filteredMovies.slice(firstPostIndex, lastPostIndex)

    const handlePageClick = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleVoteCountChange = (range) => {
            dispatch(setVoteRange(range))
    };
    const handleVoteAverageChange = (range) => {
        dispatch(setVoteAverage(range))
    }

    return (
        <>
            <HeaderMenu
                onCountChange={handleVoteCountChange}
                onAverageChange={handleVoteAverageChange}
                resetFilters={() => {
                    dispatch(resetFilters())
                    setCurrentPage(1)
                }}
            />
            {/* <HeaderNavigationMenu />     */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3'>
                {isLoading ? Array.from({ length: 8 }).map((_, index) => (
                    <MovieListSkeleton key={index} />
                )) :
                    filteredMovies && currentPosts.map((movie, index) => (
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
    )
}

export default MoviesList;