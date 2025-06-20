import React, { useState } from 'react'
import { ShoppingCart, FolderClock } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { animate } from 'animejs';
import { setSearchItem } from '@/redux-toolkit/slices/filterSlice';
import SideModal from './SideModal';
import ThemeToggle from './ThemeToggle';
import { UserButton } from '@clerk/clerk-react';
import SideSheet from './SideSheet';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.items);
    const searchItem = useSelector(state => state.filters.searchItem);
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        animate('h1 span', {
            y: [
                { to: '-2.75rem', ease: 'outExpo', duration: 600 },
                { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
            ],
            rotate: {
                from: '-1turn',
                delay: 0
            },
            delay: (_, i) => i * 50,
            ease: 'inOutCirc',
            loopDelay: 1000,
            loop: true
        });
    }, []);

    return (
        <>
            <div className='flex justify-between items-center mb-4 sticky top-0 z-50 bg-white/10 backdrop-blur-md px-4 py-2 shadow-sm'>
                <Link to={'/'} className="cursor-pointer relative w-[20%] bg-white/10 backdrop-blur-md px-4 py-2 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-[2px] rounded-xl shadow-lg">
                    <h1 className="font-bold text-white text-xl animated-title">
                        {'MoVeeFlix'.split('').map((char, index) => (
                            <span key={index} className="inline-block">{char}</span>
                        ))}
                    </h1>
                </Link>
                <div className='w-[50%] flex gap-2'>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => dispatch(setSearchItem(e.target.value))}
                        value={searchItem}
                        className={` dark:text-white placeholder:text-gray-600 dark:placeholder:text-white w-full pl-4 border rounded focus:outline-none focus:ring focus:ring-blue-300`}
                    />
                    <button onClick={handleOpenModal} className="cursor-pointer border px-4 py-2 rounded-sm flex items-center gap-2">
                        <div className="relative">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {cartItems.length}
                            </span>
                        </div>
                    </button>
                    <Link className='cursor-pointer border px-4 py-2 rounded-sm flex items-center gap-2' title='History' to={'/HistoryPage'}>
                        <FolderClock />
                    </Link>
                    <ThemeToggle />
                    <button className="cursor-pointer flex justify-end mx-2">
                        <UserButton />
                    </button>
                </div>
            </div>
            {/* <SideModal open={isOpen} onClose={() => setIsOpen(false)} /> */}
            <SideSheet open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}

export default Header
