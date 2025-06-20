import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function Gallery() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImage = useScrollOverflowMask(scrollXProgress)
    const [allMovies, setAllMovies] = useState([])
    const API_KEY = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
                );
                const data = await response.json();
                setAllMovies(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div id="example">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1
                    className="text-4xl md:text-6xl font-bold mb-6 text-center">
                    Gallery
                </h1>
            </motion.div>
            <motion.ul ref={ref} style={{ maskImage }}>
                {allMovies.map((movie) => (
                    <li key={movie.id}>
                        <motion.img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </li>
                ))}
            </motion.ul>
            <StyleSheet />
        </div>
    )
}

const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`
function useScrollOverflowMask(scrollXProgress) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

function StyleSheet() {
    return (
        <style>{`
            #example {
            width: 100vw;
            max-width: 800px;
            position: relative;
            }

            #example #progress {
                position: absolute;
                top: -65px;
                left: -15px;
                transform: rotate(-90deg);
            }

            #example .bg {
                stroke: #0b1011;
            }

            #example #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }

            #progress .indicator {
                stroke: var(--accent);
            }

            #example ul {
                display: flex;
                list-style: none;
                height: 220px;
                overflow-x: scroll;
                padding: 20px 0;
                flex: 0 0 600px;
                margin: 0 auto;
                gap: 20px;
            }

            #example ::-webkit-scrollbar {
                height: 5px;
                width: 5px;
                background: #fff3;
                -webkit-border-radius: 1ex;
            }

            #example ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
            }

            #example ::-webkit-scrollbar-corner {
                background: #fff3;
            }

            #example li {
                flex: 0 0 200px;
                background: var(--accent);
            }

    `}</style>
    )
}
