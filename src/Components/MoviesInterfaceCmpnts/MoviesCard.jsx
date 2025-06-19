import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const MoviesCard = ({
    moviesImage,
    movieTitle,
    releaseDate,
    id,
    onclick
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
                >
                <Link to={`/movie/${id}`} >
                    <img src={moviesImage} className=" w-full h-[355px] rounded-xl" />
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
