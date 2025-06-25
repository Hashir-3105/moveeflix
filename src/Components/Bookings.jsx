import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_IMAGE } from "@/Constants";
import { ArrowLeft } from "lucide-react";
import { clearCart } from "@/redux-toolkit/slices/cartSlice";
import { saveToHistory } from "@/redux-toolkit/slices/historyDetailSlice";
import LoadingSuccess from "./LoadingSuccess";

const Bookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const STATIC_Booking_PRICE = 40;
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * STATIC_Booking_PRICE;
  }, 0);

  const handleConfirmBooking = () => {
    if (cartItems.length > 0) {
      dispatch(saveToHistory(cartItems));
      dispatch(clearCart());
    }
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading ? (
        <LoadingSuccess redirectTo={"/"} />
      ) : (
        <div className="p-4 sm:p-8">
          <div className="relative flex items-center mb-8">
            <button
              onClick={() => history.back()}
              title="Go Back"
              className="absolute left-1 text-black cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <h1 className="mx-auto text-black text-3xl sm:text-4xl font-bold text-center">
              Your Bookings
            </h1>
          </div>
          {cartItems.length === 0 ? (
            <div className="flex justify-center items-center">
              <p className="text-lg sm:text-xl font-semibold text-gray-600">
                No Bookings Yet
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 mb-10 mx-auto sm:w-full md:w-2xl lg:w-3xl">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow sm:flex-col md:flex-row"
                  >
                    <div className="flex gap-2 justify-center items-center sm:flex-col md:flex-row">
                      <img
                        src={`${BASE_URL_IMAGE}${item.poster_path}`}
                        alt={item.original_title}
                        className="w-16 h-16 object-cover rounded sm:w-24 sm:h-24 md:w-16 md:h-16"
                      />
                      <div>
                        <h2 className="text-lg sm:text-xl text-black font-semibold">
                          {item.original_title}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                          Release Date: {item.release_date}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:mt-3 md:mt-0">
                      <p className="text-sm sm:text-base text-gray-500">
                        <span className="text-red-500">{item.quantity}</span>{" "}
                        {item.quantity > 1 ? "Bookings" : "Booking"} for this
                        Item
                      </p>
                      <p className="text-black">
                        Price:{" "}
                        <span className="font-semibold">
                          ${item.quantity * STATIC_Booking_PRICE}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-lg sm:text-xl w-full md:w-2xl lg:w-3xl flex flex-col text-start mx-auto font-medium">
                <p className="flex justify-between px-2 text-base text-black">
                  Total Bookings{" "}
                  <span className="font-semibold text-blue-600">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </p>
                <hr className="mx-4 my-2 h-[1px]" />
                <p className="flex justify-between px-2 text-base text-black">
                  Subtotal{" "}
                  <span className="font-semibold text-blue-600">
                    ${subTotal}
                  </span>
                </p>
              </div>

              <div className="my-3 flex justify-center items-center">
                <button
                  onClick={handleConfirmBooking}
                  className="cursor-pointer sm:w-full md:w-3xl bg-gray-300 text-black border w-full mx-auto rounded-lg py-2"
                >
                  Confirm Bookings
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookings;
