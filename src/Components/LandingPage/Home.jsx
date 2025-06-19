"use client"

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PricingSection from "./PricinigSection";
import ScrollLinked from "./Gallery";

const Home = () => {
    return (
        <>
            <div className="min-h-screen px-4 flex flex-col items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6 text-center"
                >
                    Welcome to MoveeFlix 🎬
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl text-center max-w-xl"
                >
                    Discover top-rated movies, find details, and manage your favorites in one place.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10"
                >
                    <Link
                        to="/moviesList"
                        className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition"
                    >
                        Explore Movies
                    </Link>
                </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center py-8">
                <ScrollLinked />
            </div>
            <PricingSection />
        </>

    );
};

export default Home;
