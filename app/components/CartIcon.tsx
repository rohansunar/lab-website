'use client';

import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

const CartIcon = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart className="text-2xl text-white" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon; 