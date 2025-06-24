import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen z-10">
            <Header />
            <main className="flex-grow  ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;