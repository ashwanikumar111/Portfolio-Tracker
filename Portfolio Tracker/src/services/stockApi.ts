import axios from 'axios';

const API_KEY = 'demo'; // Using Alpha Vantage demo API key

export async function getStockPrice(symbol: string): Promise<number> {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    
    const price = parseFloat(response.data['Global Quote']['05. price']);
    return isNaN(price) ? 0 : price;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return 0;
  }
}