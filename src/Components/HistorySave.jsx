import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_IMAGE } from '@/Constants';
import { clearHistory } from '@/redux-toolkit/slices/historyDetailSlice';
import ItemDetailsModal from './ItemDetailsModal';

const STATIC_Booking_PRICE = 40;

const HistorySave = () => {
    const historyItems = useSelector(state => state.history.items);
    const [selectedItem , setSelectedItem ] = useState(null)
    const dispatch = useDispatch();

    const subTotal = historyItems.reduce((acc, item) => {
        return acc + (item.quantity * STATIC_Booking_PRICE);
    }, 0);

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Booking History</h1>
                {historyItems.length > 0 && (
                    <button
                        onClick={() => dispatch(clearHistory())}
                        className="bg-red-500 text-white text-sm px-4 py-1 rounded hover:bg-red-600"
                    >
                        Clear History
                    </button>
                )}
            </div>
            {historyItems.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500 text-lg">No Bookings Yet</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {historyItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center gap-3 bg-white text-black shadow rounded-md p-3 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full   text-xs flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <img
                                    onClick={() => setSelectedItem(item)}
                                        src={`${BASE_URL_IMAGE}${item.poster_path}`}
                                        alt={item.original_title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className={`text-sm font-semibold`}>{item.original_title}</h2>
                                        <p className="text-xs text-gray-500">Release: {item.release_date}</p>
                                    </div>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-gray-600">
                                        <span className="text-red-500 font-bold">{item.quantity}</span>{" "}
                                        {item.quantity > 1 ? "Bookings" : "Booking"}
                                    </p>
                                    <p className="text-gray-700 font-medium">
                                        ${item.quantity * STATIC_Booking_PRICE}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 border-t pt-4 text-sm font-medium space-y-2">
                        <div className="flex justify-between">
                            <span>Total Bookings</span>
                            <span className="text-blue-600 font-semibold">
                                {historyItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-blue-600 font-semibold">${subTotal}</span>
                        </div>
                    </div>
                </>
            )}
            {selectedItem && (
                <ItemDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
};

export default HistorySave;
