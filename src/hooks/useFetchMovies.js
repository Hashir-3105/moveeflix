import React from "react";
import { BASE_URL } from "@/Constants";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function useFetchMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const filters = useSelector((state) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function moviesList() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );
        const moviesData = await response.json();
        console.log("Yayyyyy", moviesData.results);
        setAllMovies(moviesData.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    moviesList();
  }, []);
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
    console.log("Filtering from original movies:", allMovies.length);
    console.log("Current filters:", filters);
    return result;
  }, [allMovies, filters]);

  const postPerPage = 8;
  const totalPages = Math.ceil(filteredMovies.length / postPerPage);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredMovies.slice(firstPostIndex, lastPostIndex);

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
