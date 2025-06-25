import React, { useState, useEffect, useRef, use } from "react";
import { ShoppingCart, FolderClock, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { animate } from "animejs";
import { setSearchItem } from "@/redux-toolkit/slices/filterSlice";
import ThemeToggle from "../Hooks/ThemeToggle";
import { UserButton } from "@clerk/clerk-react";
import SideSheet from "./SideSheet";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const searchItem = useSelector((state) => state.filters.searchItem);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenu(false);
      }
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    animate("h1 span", {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: (_, i) => i * 50,
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white/10 backdrop-blur-md px-4 py-2 shadow-sm">
        <Link
          to="/"
          className="min-w-[110px] relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-center w-full h-full bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 hover:scale-105 transition-transform">
            <h1 className="font-bold text-white text-sm sm:text-xl tracking-wide animated-title">
              {"MoVeeFlix".split("").map((char, index) => (
                <span key={index} className="inline-block">
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </Link>
        <div className="hidden md:flex w-[50%] gap-2">
          {currentPath === "/" ? (
            <div className="flex items-center gap-2 w-full">
              {/* <Link className="cursor-pointer border px-4 py-2 rounded-sm flex items-center gap-2 scroll-mt-24">
                Gallery
              </Link>
              <Link
                to={"/"}
                className="cursor-pointer border px-4 py-2 rounded-sm flex items-center gap-2"
              >
                Pricing
              </Link> */}
            </div>
          ) : (
            <>
              <motion.input
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                type="text"
                placeholder="Search..."
                onChange={(e) => dispatch(setSearchItem(e.target.value))}
                value={searchItem}
                className={` dark:text-white placeholder:text-gray-600 dark:placeholder:text-white w-full pl-4 border rounded focus:outline-none focus:ring focus:ring-blue-300`}
              />
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={handleOpenModal}
                className="cursor-pointer border px-4 py-2 rounded-sm flex items-center gap-2"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                </div>
              </motion.button>
            </>
          )}
          <Link
            className="cursor-pointer border px-4 py-2 rounded-sm flex items-center gap-2"
            title="History"
            to={"/HistoryPage"}
          >
            <FolderClock />
          </Link>
          <ThemeToggle />
          <button className="cursor-pointer flex justify-end mx-2">
            <UserButton />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          {searchVisible ? (
            <AnimatePresence>
              <motion.input
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                type="text"
                ref={searchInputRef}
                placeholder="Search..."
                onChange={(e) => dispatch(setSearchItem(e.target.value))}
                value={searchItem}
                className="w-full pl-4 py-2 border border-gray-400 rounded-lg  dark:text-white dark:bg-gray-800 dark:placeholder:text-white placeholder:text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </AnimatePresence>
          ) : (
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className="ursor-pointer flex justify-end"
            >
              <Search />
            </button>
          )}
          <button className="cursor-pointer flex justify-end">
            <UserButton />
          </button>
          <button
            className="cursor-pointer text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.ul
              ref={mobileMenuRef}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col gap-4 z-50 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl absolute top-full left-0 w-full mt-2"
            >
              {currentPath === "/" ? (
                <>
                  <li>
                    <Link
                      to="/"
                      className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                      onClick={() => setMobileMenu(false)}
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Pricing"
                      className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                      onClick={() => setMobileMenu(false)}
                    >
                      Pricing
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => {
                        handleOpenModal();
                        setMobileMenu(false);
                      }}
                      className="flex items-center gap-2 border px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="text-sm">Cart</span>
                      </div>
                      <span className="bg-red-500 px-2 py-0.5 rounded-full text-xs">
                        {cartItems.length}
                      </span>
                    </button>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/HistoryPage"
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                  onClick={() => setMobileMenu(false)}
                >
                  History
                </Link>
              </li>
              <div className="flex items-center justify-between mt-4">
                <ThemeToggle />
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <SideSheet open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
