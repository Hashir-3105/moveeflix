import { animate, stagger } from 'motion';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailsSkeleton from '../Skeleton/MovieDetailsSkeleton';
import { BASE_URL, BASE_URL_IMAGE } from '@/Constants';
import { motion } from 'framer-motion';
import Modal from '../../Hooks/Modal';
import Loader from '../Loader';

const MovieDetails = () => {
    const [selectedMovies, setSelectedMovies] = useState(null);
    const [playMovie, setPlayMovie] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false);

    const { id } = useParams();
    const API_KEY = import.meta.env.VITE_API_KEY;
    const titleRef = useRef(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
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
            const words = text.split(' ').map((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.className = 'inline-block opacity-0 translate-y-2';
                span.style.willChange = 'transform, opacity';
                return span;
            });

            element.innerHTML = '';
            words.forEach((span) => element.appendChild(span));

            animate(
                element.querySelectorAll('span'),
                { opacity: [0, 1], y: [10, 0] },
                {
                    delay: stagger(0.05),
                    duration: 0.8,
                    easing: 'ease-out',
                }
            );
        });
    }, [selectedMovies]);

    const handlePlay = async (movieId) => {
        try {
            const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
            const data = await res.json();
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (trailer) {
                setPlayMovie(trailer);
                setShowPlayer(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-full  w-[90%] overflow-y-auto mx-auto my-2 p-2 bg-[oklch(0.27 0.01 0)] rounded-lg scrollbar-hide">
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
                    <div className="w-full lg:w-[60%] border rounded-xl p-6  overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-hide">
                        <h2
                            ref={titleRef}
                            className="text-3xl font-bold mb-4  pb-2"
                        >
                            {selectedMovies.title}
                        </h2>

                        <p className=" mb-6 leading-relaxed">
                            <span className="font-semibold">Overview:</span> <span className='text-gray-500'>{selectedMovies.overview}</span>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><span className="font-semibold">Vote Average :</span> {selectedMovies.vote_average}</p>
                            <p><span className="font-semibold">Vote Count :</span> {selectedMovies.vote_count}</p>
                            <p><span className="font-semibold">Genres :</span> {selectedMovies.genres?.map(g => g.name).join(', ')}</p>
                            <p><span className="font-semibold">Budget :</span> ${selectedMovies.budget?.toLocaleString()}</p>
                            <p><span className="font-semibold">Revenue :</span> ${selectedMovies.revenue?.toLocaleString()}</p>
                            <p><span className="font-semibold">Country :</span> {selectedMovies.production_countries?.map(c => c.name).join(', ')}</p>
                            <p><span className="font-semibold">Language :</span> {selectedMovies.original_language}</p>
                            <p><span className="font-semibold">Release Date :</span> {selectedMovies.release_date}</p>
                            <p><span className="font-semibold">Status :</span> {selectedMovies.status}</p>
                        </div>
                        <button className='border px-2 py-1 rounded-xl cursor-pointer mt-4 hover:transition transform ease-in-out' onClick={() => handlePlay(selectedMovies.id)}>Watch Now</button>
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
