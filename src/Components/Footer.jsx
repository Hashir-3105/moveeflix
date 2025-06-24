import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white mt-12 rounded-t-2xl shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">🎬 MoVeeFlix</h2>
                    <p className="text-sm text-white/80">Your gateway to cinematic magic ✨</p>
                </div>
                
                <div className="flex space-x-6 text-sm font-medium">
                    <Link onClick={() => window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })} to="/" className="hover:text-white">Home</Link>
                    <a href="#gallery" className="hover:text-white">Contact us</a>
                    <a href="#top-rated" className="hover:text-white">Top Rated</a>
                    {/* <a href="#" className="hover:text-white">Contact</a> */}
                </div>

                <div className="text-sm text-white/80 text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} MoVeeFlix. All rights reserved.</p>
                    <p>Built with 💙 by Hasnat</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
