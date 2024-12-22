import { Stock, PortfolioMetrics } from '../types/stock';

export function calculatePortfolioMetrics(stocks: Stock[]): PortfolioMetrics {
  const totalValue = stocks.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.quantity,
    0
  );

  const totalGainLoss = stocks.reduce(
    (sum, stock) => sum + (stock.currentPrice - stock.buyPrice) * stock.quantity,
    0
  );

  const sortedByPerformance = [...stocks].sort(
    (a, b) =>
      (b.currentPrice - b.buyPrice) / b.buyPrice -
      (a.currentPrice - a.buyPrice) / a.buyPrice
  );

  return {
    totalValue,
    totalGainLoss,
    topPerformer: sortedByPerformance[0] || null,
    worstPerformer: sortedByPerformance[sortedByPerformance.length - 1] || null,
  };
}