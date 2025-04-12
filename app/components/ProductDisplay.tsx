'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  image: string;
  isHighlighted: boolean;
  type: 'donut' | 'drink';
  price: number;
}

const ProductDisplay: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'donut' | 'drink'>('donut');
  const [products, setProducts] = useState<Product[]>([
    // Donuts
    { name: 'Pumpkin Spice Iced Doughnut', image: '/images/products/pumpkin-iced.svg', isHighlighted: false, type: 'donut', price: 1.29 },
    { name: 'Pumpkin Spice Cake Doughnut', image: '/images/products/pumpkin-cake.svg', isHighlighted: false, type: 'donut', price: 1.29 },
    { name: 'Old Fashioned Doughnut', image: '/images/products/old-fashioned.svg', isHighlighted: false, type: 'donut', price: 1.29 },
    { name: 'Chocolate Iced Doughnut', image: '/images/products/chocolate.svg', isHighlighted: false, type: 'donut', price: 1.09 },
    { name: 'Chocolate Iced Doughnut with Sprinkles', image: '/images/products/chocolate-sprinkles.svg', isHighlighted: false, type: 'donut', price: 1.09 },
    { name: 'Raspberry Filled Doughnut', image: '/images/products/raspberry.svg', isHighlighted: false, type: 'donut', price: 1.09 },
    { name: 'Blueberry Cake Doughnut', image: '/images/products/blueberry.svg', isHighlighted: false, type: 'donut', price: 1.09 },
    { name: 'Strawberry Iced Doughnut with Sprinkles', image: '/images/products/strawberry.svg', isHighlighted: false, type: 'donut', price: 1.09 },
    { name: 'Lemon Filled Doughnut', image: '/images/products/lemon.svg', isHighlighted: false, type: 'donut', price: 1.09 },
    { name: 'Doughnut Holes', image: '/images/products/holes.svg', isHighlighted: false, type: 'donut', price: 3.99 },
    // Drinks
    { name: 'Pumpkin Spice Coffee', image: '/images/products/pumpkin-coffee.svg', isHighlighted: false, type: 'drink', price: 2.59 },
    { name: 'Pumpkin Spice Latte', image: '/images/products/pumpkin-latte.svg', isHighlighted: false, type: 'drink', price: 4.59 },
    { name: 'Regular Brewed Coffee', image: '/images/products/coffee.svg', isHighlighted: false, type: 'drink', price: 1.79 },
    { name: 'Decaf Brewed Coffee', image: '/images/products/coffee.svg', isHighlighted: false, type: 'drink', price: 1.79 },
    { name: 'Latte', image: '/images/products/latte.svg', isHighlighted: false, type: 'drink', price: 3.49 },
    { name: 'Cappuccino', image: '/images/products/cappuccino.svg', isHighlighted: false, type: 'drink', price: 3.49 },
    { name: 'Caramel Macchiato', image: '/images/products/caramel-macchiato.svg', isHighlighted: false, type: 'drink', price: 3.49 }
  ]);

  useEffect(() => {
    const handleProductHighlight = (event: CustomEvent<{ productName: string; action: 'show' | 'hide' }>) => {
      const { productName, action } = event.detail;
      
      // Find the product and switch category if needed
      const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
      if (product && action === 'show') {
        setActiveCategory(product.type);
      }

      setProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          isHighlighted: product.name.toLowerCase() === productName.toLowerCase() ? action === 'show' : false
        }))
      );
    };

    window.addEventListener('productHighlight', handleProductHighlight as EventListener);
    return () => {
      window.removeEventListener('productHighlight', handleProductHighlight as EventListener);
    };
  }, [products]);

  const filteredProducts = products.filter(product => product.type === activeCategory);

  return (
    <div>
      {/* Menu Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Menu</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveCategory('donut')}
          className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeCategory === 'donut'
              ? 'bg-yellow-400 text-white'
              : 'text-gray-600 hover:text-gray-900 bg-gray-100'
          }`}
        >
          Donuts
        </button>
        <button
          onClick={() => setActiveCategory('drink')}
          className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeCategory === 'drink'
              ? 'bg-yellow-400 text-white'
              : 'text-gray-600 hover:text-gray-900 bg-gray-100'
          }`}
        >
          Drinks
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product, index) => (
          <div 
            key={index}
            className={`relative transition-all duration-300 ease-in-out transform ${
              product.isHighlighted 
                ? 'scale-110 z-10 ring-4 ring-yellow-400 shadow-xl bg-white' 
                : 'scale-100 hover:scale-105'
            }`}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority={index < 5}
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
