import React from "react";
import { Sheet, SheetContent } from "@/Components/ui/SheetComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_IMAGE } from "@/Constants";
import { Link } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
} from "@/redux-toolkit/slices/cartSlice";
import { removeFromCart } from "@/redux-toolkit/slices/cartSlice";
import { X } from "lucide-react";

const SideSheet = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const STATIC_Booking_PRICE = 40;
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] p-4 text-black flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <h1 className="text-lg font-bold mb-4 text-black">
            {" "}
            {cartItems.length > 1 ? "Items" : "Item"} ( {cartItems.length} ){" "}
          </h1>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex gap-2 items-center mb-4 border p-2 rounded-md"
            >
              <img
                src={`${BASE_URL_IMAGE}${item.poster_path}`}
                className="w-20 h-24 rounded"
              />
              <div>
                <h2 className="text-md text-black font-semibold">
                  {item.original_title}
                </h2>
                <p className="text-sm text-gray-500">
                  Released Date: {item.release_date}
                </p>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      className="w-8 h-8 text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded transition duration-200"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="text-md text-black font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded transition duration-200"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-2 text-black">
                    <p>Price : ${item.quantity * STATIC_Booking_PRICE} </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="absolute cursor-pointer top-1 right-1 text-gray-500 hover:text-red-500 transition"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-white p-2">
          <Link
            to={"/BookingsPage"}
            className="flex justify-center items-center"
          >
            <button
              disabled={cartItems.length === 0}
              className={`w-full ${
                cartItems.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
              } px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-semibold shadow-md`}
            >
              Book Now
            </button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideSheet;
