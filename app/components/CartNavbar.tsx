'use client';

import { useCart } from '@/app/context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export const CartNavbar = () => {
  const { items, removeFromCart, getCartTotal } = useCart();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform animate-slide-up z-[100]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Items Summary */}
          <div className="flex-1 max-w-2xl overflow-x-auto hide-scrollbar">
            <div className="flex gap-4">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg min-w-max"
                >
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Total and Action */}
          <div className="flex items-center gap-6 ml-6">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">₹{getCartTotal()}</p>
            </div>
            <Link
              href="/cart"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaShoppingCart size={16} />
              <span>Go to Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 