import { useState, useEffect, useCallback } from 'react';
import { Stock } from '../types/stock';
import { getStockPrice } from '../services/stockApi';

export function useStockPrices(stocks: Stock[]) {
  const [updatedStocks, setUpdatedStocks] = useState<Stock[]>(stocks);

  const updatePrices = useCallback(async () => {
    const updated = await Promise.all(
      stocks.map(async (stock) => ({
        ...stock,
        currentPrice: await getStockPrice(stock.symbol),
      }))
    );
    setUpdatedStocks(updated);
  }, [stocks]);

  useEffect(() => {
    updatePrices();
    const interval = setInterval(updatePrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [updatePrices]);

  return updatedStocks;
}