import React from "react";
import { BASE_URL } from "@/Constants";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function useFetchMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [currentPage, setCurrentPage] = useState(1);
  const filters = useSelector((state) => state.filters);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function moviesList() {
      try {
        setIsLoading(true);
        let url = "";

        if (filters.searchItem.trim()) {
          url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            filters.searchItem
          )}&page=${currentPage}`;
        } else {
          url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;
        }
        const response = await fetch(url);
        const moviesData = await response.json();
        setAllMovies(moviesData.results);
        setTotalPages(
          moviesData.total_pages > 20 ? 50 : moviesData.total_pages
        );
        console.log(moviesData.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    moviesList();
  }, [filters.searchItem, currentPage]);

  const filteredMovies = useMemo(() => {
    const result = allMovies
      .filter((movie) =>
        movie.original_title
          .toLowerCase()
          .includes(filters.searchItem.toLowerCase())
      )
      .filter((movie) => {
        const voteCount = movie.vote_count;
        if (filters.voteRange === "1-500")
          return voteCount >= 1 && voteCount <= 500;
        if (filters.voteRange === "501-1000")
          return voteCount >= 501 && voteCount <= 1000;
        if (filters.voteRange === "1000+") return voteCount > 1000;
        return true;
      })
      .filter((movie) => {
        const voteAverage = movie.vote_average;
        if (filters.voteAverage === "1-5")
          return voteAverage >= 1 && voteAverage <= 5;
        if (filters.voteAverage === "5+") return voteAverage > 5;
        return true;
      });
    return result;
  }, [allMovies, filters]);

  // const postPerPage = 8;
  // const totalPages = Math.ceil(allMovies.length / postPerPage);
  // const lastPostIndex = currentPage * postPerPage;
  // const firstPostIndex = lastPostIndex - postPerPage;
  // const currentPosts = allMovies.slice(firstPostIndex, lastPostIndex);
  const currentPosts = allMovies;

  return {
    allMovies,
    isLoading,
    filteredMovies,
    setCurrentPage,
    currentPosts,
    totalPages,
    currentPage,
  };
}
export default useFetchMovies;
