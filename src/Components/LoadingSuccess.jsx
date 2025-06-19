import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const LoadingSuccess = ({ redirectTo }) => {
    const [loading, setLoading] = useState(true);
    const [showTick, setShowTick] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setLoading(false);
            setShowTick(true);
        }, 2500);

        const timer2 = setTimeout(() => {
            navigate(redirectTo);
        }, 3500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [navigate, redirectTo]);
    return (
        <div className="flex justify-center items-center h-screen bg-white flex-col gap-4">
            {loading ? (
                <ClipLoader size={60} color="#3B82F6" />
            ) : (
                <FaCheckCircle className="text-green-500 text-6xl" />
            )}
            <p className="text-gray-600 font-medium text-lg">
                {loading ? "Processing your booking..." : "Success!"}
            </p>
        </div>
    );
};

export default LoadingSuccess;
