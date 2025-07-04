import MovieDetailsSkeleton from "../Skeleton/MovieDetailsSkeleton";
import { BASE_URL_IMAGE } from "@/Constants";
import { motion } from "framer-motion";
import Modal from "../reusable-components/Modal";
import Loader from "../Loader";
import useMovieDetails from "@/hooks/useMovieDetails";
import { LiquidButton } from "../animate-ui/buttons/liquid";

const MovieDetails = () => {
  const {
    selectedMovies,
    titleRef,
    playMovie,
    setShowPlayer,
    showPlayer,
    handlePlay,
  } = useMovieDetails();

  return (
    <div className="h-full w-[90%] overflow-y-auto mx-auto my-2 p-2 bg-[oklch(0.27 0.01 0)] rounded-lg scrollbar-hide">
      {selectedMovies ? (
        <div className="flex flex-col lg:flex-row gap-8 mt-8 mx-6">
          <div className="w-full lg:w-[40%] max-h-[calc(100vh-140px)]">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
            >
              <img
                src={`${BASE_URL_IMAGE}${selectedMovies.poster_path}`}
                alt={selectedMovies.title}
                className="rounded-xl w-full h-auto max-h-[70vh] object-fill"
              />
            </motion.div>
          </div>
          <div className="relative w-full lg:w-[60%] border rounded-xl p-6 max-h-[calc(100vh-140px)] flex flex-col">
            <div className="overflow-y-auto scrollbar-hide mb-4 flex-1">
              <h2 ref={titleRef} className="text-3xl font-bold mb-4 pb-2">
                {selectedMovies.title}
              </h2>

              <p className="mb-6 leading-relaxed">
                <span className="font-semibold">Overview:</span>{" "}
                <span className="text-gray-500">{selectedMovies.overview}</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold">Vote Average :</span>{" "}
                  {selectedMovies.vote_average}
                </p>
                <p>
                  <span className="font-semibold">Vote Count :</span>{" "}
                  {selectedMovies.vote_count}
                </p>
                <p>
                  <span className="font-semibold">Genres :</span>{" "}
                  {selectedMovies.genres?.map((g) => g.name).join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Budget :</span> $
                  {selectedMovies.budget?.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Revenue :</span> $
                  {selectedMovies.revenue?.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Country :</span>{" "}
                  {selectedMovies.production_countries
                    ?.map((c) => c.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Language :</span>{" "}
                  {selectedMovies.original_language}
                </p>
                <p>
                  <span className="font-semibold">Release Date :</span>{" "}
                  {selectedMovies.release_date}
                </p>
                <p>
                  <span className="font-semibold">Status :</span>{" "}
                  {selectedMovies.status}
                </p>
              </div>
            </div>
            <div className="w-full mt-auto">
              <LiquidButton
                className="w-full px-4 py-2"
                onClick={() => handlePlay(selectedMovies.id)}
              >
                Watch Trailer
              </LiquidButton>
            </div>
            <Modal isOpen={showPlayer} onClose={() => setShowPlayer(false)}>
              {playMovie && (
                <div className="w-full aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${playMovie.key}`}
                    title="YouTube trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-xl"
                  />
                </div>
              )}
            </Modal>
          </div>
        </div>
      ) : (
        <MovieDetailsSkeleton />
      )}
    </div>
  );
};

export default MovieDetails;
