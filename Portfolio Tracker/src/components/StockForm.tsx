import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Stock } from '../types/stock';

interface StockFormProps {
  stock?: Stock;
  onSubmit: (stock: Omit<Stock, 'id' | 'currentPrice'>) => void;
  onClose: () => void;
}

export function StockForm({ stock, onSubmit, onClose }: StockFormProps) {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    quantity: 1,
    buyPrice: 0,
  });

  useEffect(() => {
    if (stock) {
      setFormData({
        symbol: stock.symbol,
        name: stock.name,
        quantity: stock.quantity,
        buyPrice: stock.buyPrice,
      });
    }
  }, [stock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {stock ? 'Edit Stock' : 'Add Stock'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                Symbol
              </label>
              <input
                type="text"
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">
                Buy Price
              </label>
              <input
                type="number"
                id="buyPrice"
                min="0"
                step="0.01"
                value={formData.buyPrice}
                onChange={(e) => setFormData({ ...formData, buyPrice: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {stock ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}