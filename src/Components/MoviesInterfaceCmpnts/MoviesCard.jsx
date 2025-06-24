import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
const MoviesCard = ({
    moviesImage,
    movieTitle,
    releaseDate,
    id,
    onclick,
    onplay
}) => {

    const box = {
        borderRadius: 5,
    }


    return (
        <div className='border hover:border-gray-300 rounded-2xl m-1 p-1'>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={box}
                className='relative group overflow-hidden rounded-xl'
            >
                {/* <Link to={`/movie/${id}`} > */}
                    <img src={moviesImage} className=" w-full h-[355px] rounded-xl" />
                {/* </Link> */}
                <Link
                    to={`/movie/${id}`}
                    // onClick={onplay}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                    <Play className="w-10 h-10 hidden group-hover:block  text-white  transition-colors duration-300" />
                </Link>

            </motion.div>
            <div className='flex justify-between items-center p-2'>
                <div className=' w-[60%] flex flex-col justify-center text-start px-2 text-gray-600'>
                    <h2 className="truncate whitespace-nowrap overflow-hidden">{movieTitle}</h2>
                    <p>{releaseDate}</p>
                </div>

                <button onClick={onclick} className="w-[40%] cursor-pointer px-2 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default MoviesCard
