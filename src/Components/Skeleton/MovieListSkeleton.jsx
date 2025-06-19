import React from 'react';

const MovieListSkeleton = () => {
    return (
        <div className='border rounded-2xl m-2 p-2 shadow-md bg-white animate-pulse'>
            <div className="w-full h-96 bg-gray-200 rounded-xl mb-3"></div>
            <div className='flex flex-col justify-center text-start px-2 gap-2'>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    );
};

export default MovieListSkeleton;
