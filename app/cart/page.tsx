'use client';

import { useCart } from '@/app/context/CartContext';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, getCartTotal } = useCart();

  // Group items by pathology lab
  const itemsByLab = items.reduce((acc, item) => {
    if (!acc[item.pathologyName]) {
      acc[item.pathologyName] = [];
    }
    acc[item.pathologyName].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {Object.entries(itemsByLab).map(([labName, labItems]) => (
            <div key={labName} className="bg-white rounded-lg shadow-sm mb-6 p-6">
              <h2 className="text-xl font-semibold mb-4">{labName}</h2>
              <div className="space-y-4">
                {labItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">₹{item.price}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {items.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-2xl font-bold">₹{getCartTotal()}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
              >
                Proceed to Payment
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 