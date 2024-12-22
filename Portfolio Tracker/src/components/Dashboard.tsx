import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { PortfolioMetrics } from '../types/stock';

interface DashboardProps {
  metrics: PortfolioMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Total Value</h3>
          <DollarSign className="h-5 w-5 text-blue-500" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          ${metrics.totalValue.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Total Gain/Loss</h3>
          {metrics.totalGainLoss >= 0 ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
        </div>
        <p className={`mt-2 text-3xl font-bold ${
          metrics.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          ${Math.abs(metrics.totalGainLoss).toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Top Performer</h3>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {metrics.topPerformer?.symbol || 'N/A'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Portfolio Distribution</h3>
          <PieChart className="h-5 w-5 text-purple-500" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {metrics.topPerformer ? `Largest holding: ${metrics.topPerformer.symbol}` : 'No holdings'}
        </p>
      </div>
    </div>
  );
}