import React from 'react';

const MovieDetailsSkeleton = () => {
    return (
        <div className="flex gap-6 animate-pulse p-6">
            <div className="w-[40%] flex justify-center items-center">
                <div className="bg-gray-300 rounded-2xl w-full h-[400px]"></div>
            </div>
            <div className="w-[60%] flex flex-col gap-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-full"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    );
};

export default MovieDetailsSkeleton;
