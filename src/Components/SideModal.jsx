import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_IMAGE } from '@/Constants';
import { Link} from 'react-router-dom';
import { incrementQuantity , decrementQuantity } from '@/redux-toolkit/slices/cartSlice';
import { removeFromCart } from '@/redux-toolkit/slices/cartSlice';

export default function SideModal({ open, onClose }) {
    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch();
    const STATIC_Booking_PRICE = 40;
    
    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed z-50 inset-0 bg-black/50" />
                <Dialog.Content className="fixed z-50 rounded-lg top-0 right-0 w-96 h-full bg-white shadow-lg p-5 overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-gray-200 px-2 py-1 rounded"
                    >
                        <X size={24} className="text-gray-600 hover:text-black" />
                    </button>
                    <h1 className="text-lg font-bold mb-4 text-black">Items ({cartItems.length})</h1>
                    {cartItems.map((item) => (
                        <div key={item.id} className="relative flex gap-2 items-center mb-4 border p-2 rounded-md">
                            <img
                                src={`${BASE_URL_IMAGE}${item.poster_path}`}
                                className="w-20 h-24 rounded"
                            />
                            <div>
                                <h2 className="text-md text-black font-semibold">{item.original_title}</h2>
                                <p className="text-sm text-gray-500">Released Date: {item.release_date}</p>
                                <div className="flex justify-between items-center gap-4">
                                    <div className='flex items-center gap-3 mt-2'>
                                        <button
                                            className="w-8 h-8 text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded transition duration-200"
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                        >
                                            -
                                        </button>
                                        <span className="text-md text-black font-medium">{item.quantity}</span>
                                        <button
                                            className="w-8 h-8 text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded transition duration-200"
                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className='mt-2 text-black'>
                                        <p>Price : ${item.quantity * STATIC_Booking_PRICE} </p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => dispatch(removeFromCart(item.id))} className="absolute cursor-pointer top-1 right-1 text-gray-500 hover:text-red-500 transition">
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                    <Link to={'/BookingsPage'} className='flex justify-center items-center'>
                        <button disabled={cartItems.length === 0} className="fixed bottom-0 mb-2 w-68  overflow-hidden cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                            Book Now
                        </button>
                    </Link> 
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
