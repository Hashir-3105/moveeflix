import React from 'react';
import { BASE_URL_IMAGE } from '@/Constants';
import * as Dialog from '@radix-ui/react-dialog';

const ItemDetailsModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <Dialog.Root open={!!item} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
                <Dialog.Content
                    className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-md p-5 shadow-lg"
                >
                    <div className="relative">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                        >
                            ×
                        </button>
                        <img
                            src={`${BASE_URL_IMAGE}${item.poster_path}`}
                            alt={item.original_title}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h2 className="text-xl font-bold mb-2">{item.original_title}</h2>
                        <p className="text-sm text-gray-600 mb-1">Release Date: {item.release_date}</p>
                        <p className="text-sm text-gray-600 mb-1">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Total Price: ${item.quantity * 40}</p>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ItemDetailsModal;
