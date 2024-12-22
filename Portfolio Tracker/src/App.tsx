import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StockList } from './components/StockList';
import { StockForm } from './components/StockForm';
import { Stock } from './types/stock';
import { getStockPrice } from './services/stockApi';
import { useStockPrices } from './hooks/useStockPrices';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculatePortfolioMetrics } from './utils/portfolioMetrics';

function App() {
  const [baseStocks, setBaseStocks] = useLocalStorage<Stock[]>('stocks', []);
  const [showForm, setShowForm] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | undefined>();
  
  // Get real-time prices
  const stocks = useStockPrices(baseStocks);
  const metrics = calculatePortfolioMetrics(stocks);

  const handleAddStock = async (stockData: Omit<Stock, 'id' | 'currentPrice'>) => {
    const currentPrice = await getStockPrice(stockData.symbol);
    const newStock: Stock = {
      ...stockData,
      id: Date.now().toString(),
      currentPrice,
    };
    setBaseStocks([...baseStocks, newStock]);
  };

  const handleEditStock = async (stockData: Omit<Stock, 'id' | 'currentPrice'>) => {
    if (!editingStock) return;
    
    const currentPrice = await getStockPrice(stockData.symbol);
    const updatedStock: Stock = {
      ...stockData,
      id: editingStock.id,
      currentPrice,
    };
    
    setBaseStocks(baseStocks.map((s) => (s.id === editingStock.id ? updatedStock : s)));
    setEditingStock(undefined);
  };

  const handleDeleteStock = (id: string) => {
    setBaseStocks(baseStocks.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Tracker</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Stock
          </button>
        </div>

        <Dashboard metrics={metrics} />
        
        <StockList
          stocks={stocks}
          onEdit={(stock) => {
            setEditingStock(stock);
            setShowForm(true);
          }}
          onDelete={handleDeleteStock}
        />

        {showForm && (
          <StockForm
            stock={editingStock}
            onSubmit={editingStock ? handleEditStock : handleAddStock}
            onClose={() => {
              setShowForm(false);
              setEditingStock(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;