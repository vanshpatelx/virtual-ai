'use client';

import React, { useState, useEffect } from 'react';
import { OrderDetailsData, OrderItem } from '@/lib/types';

function prepOrderDetails(orderDetailsData: OrderItem[]): OrderDetailsData {
  try {
    const totalAmount = orderDetailsData.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    return {
      items: orderDetailsData,
      totalAmount: Number(totalAmount.toFixed(2))
    };
  } catch (error) {
    console.error('Failed to prepare order details:', error);
    return {
      items: [],
      totalAmount: 0
    };
  }
}

const OrderDetails: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsData>({
    items: [],
    totalAmount: 0
  });

  useEffect(() => {
    const handleOrderUpdate = (event: CustomEvent<OrderItem[]>) => {
      console.log('Received order update:', event.detail);
      const formattedData = prepOrderDetails(event.detail);
      setOrderDetails(formattedData);
    };

    const handleCallEnded = () => {
      setOrderDetails({
        items: [],
        totalAmount: 0
      });
    };

    window.addEventListener('orderDetailsUpdated', handleOrderUpdate as EventListener);
    window.addEventListener('callEnded', handleCallEnded as EventListener);

    return () => {
      window.removeEventListener('orderDetailsUpdated', handleOrderUpdate as EventListener);
      window.removeEventListener('callEnded', handleCallEnded as EventListener);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatOrderItem = (item: OrderItem, index: number) => (
    <div key={index} className="mb-3 pl-4 border-l-2 border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-gray-900 font-medium">{item.quantity}x {item.name}</span>
        <span className="text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
      </div>
      {item.specialInstructions && (
        <div className="text-sm text-gray-600 italic mt-1">
          Note: {item.specialInstructions}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {orderDetails.items.length === 0 ? (
        <div className="text-gray-900 text-sm text-center py-4">
          Your order is empty. Start by speaking to our virtual assistant!
        </div>
      ) : (
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {orderDetails.items.map((item, index) => formatOrderItem(item, index))}
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-semibold">Total:</span>
              <span className="text-gray-900 font-bold">{formatCurrency(orderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;