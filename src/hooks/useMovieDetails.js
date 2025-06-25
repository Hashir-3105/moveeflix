import { useEffect, useState, useRef } from "react";
import { animate, stagger } from "motion";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/Constants";
function useMovieDetails() {
  const [selectedMovies, setSelectedMovies] = useState(null);
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const titleRef = useRef(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setSelectedMovies(data);
      } catch (error) {
        console.log(error);
      }
    }

    setTimeout(fetchMovieDetails, 500);
  }, [id]);

  useEffect(() => {
    if (!selectedMovies || !titleRef.current) return;
    document.fonts.ready.then(() => {
      const element = titleRef.current;
      const text = element.textContent;
      const words = text.split(" ").map((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.className = "inline-block opacity-0 translate-y-2";
        span.style.willChange = "transform, opacity";
        return span;
      });

      element.innerHTML = "";
      words.forEach((span) => element.appendChild(span));

      animate(
        element.querySelectorAll("span"),
        { opacity: [0, 1], y: [10, 0] },
        {
          delay: stagger(0.05),
          duration: 0.8,
          easing: "ease-out",
        }
      );
    });
  }, [selectedMovies]);
  const [playMovie, setPlayMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const handlePlay = async (movieId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setPlayMovie(trailer);
        setShowPlayer(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    selectedMovies,
    titleRef,
    playMovie,
    showPlayer,
    setShowPlayer,
    handlePlay,
  };
}

export default useMovieDetails;
