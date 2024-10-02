//importing necessary dependancies and custom components

import React, {useState,useEffect} from 'react'
import axios from 'axios';
import CurrencySelector from './components/CurrencySelector.jsx';
import ConversionResult from './components/ConversionResult.JSX';
import AmountInput from './components/AmountInput.jsx';
import HistoricalRates from './components/HistoricalRates.jsx';
import DarkMode from './components/DarkMode.jsx';

//Definining variables for API keu and URL
const API_KEY = '3a902d0a157e4c5e795ed257';
const API_BASE_URL =  'https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD'

//Creating an arrow function
const App = () => {
  //Creating state variables
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [error, setError] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

//creating useEffect hook that runs once when the component mounts, fetchees and stores Api results in rates states
useEffect(() => {
  const fetchRates = async () => {
    try{
      const result = await axios.get(`${API_BASEURL}/${API_KEY}/latest/USD`);
      setRates(result.data.conversion_rates);
    }catch (error){
      setError('Failed to get rates. Please try again!')
    }
  };

  fetchRates();
}, []);

//Setting useEffect hook to display conversion rates whenever the amount, currencies, or rates change.
useEffect(()=>{
  if (rates[toCurrency]) {
     const response = (amount * rates[toCurrency]) / rates[fromCurrency];
     setConvertedAmount(response.toFixed(2)); //sets results to 2 decimal points
  }
}, [amount, fromCurrency, toCurrency, rates]);

//setting event hanler functions to update states whenever user input changes
const handleFromCurrencyChange = (currency) => setFromCurrency(currency);
const handleToCurrencyChange = (currency) => setToCurrency(currency);
const handleAmountChange = (amount) => setAmount(amount);
const handleDarkModeToggle = () => setIsDarkMode(!isDarkMode);

//Setting variable for getting currencies from the currencyData
const getCurrencies = currencyData.map(currency => currency.code);

//Setting Dynamic class for dark Mode feature
const darkContainer = `min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`;

  return (
    <div className={darkContainer}>
      <div className="continer mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-1g shadow-md max-w-md mx-auto">
        <h1 className="tet-2xl font-bold mb-6 text-center">Don's Currency Converter</h1>
        <DarkMode isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
     {error && <div className="text-red-500 mb-4">{error}</div>}
     <div className="space-y-4">
        <CurrencySelector 
        label="From"
        value={fromCurrency}
        onChange={handleFromCurrencyChange}
        currencies={getCurrencies} 
        />

       <CurrencySelector 
       label="To"
       value={toCurrency}
       onChange={handleToCurrencyChange}
       currencies={getCurrencies}
       />

       <AmountInput value={amount} onChange={handleAmountChange} />
     
       <ConversionResult
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              amount={amount}
              convertedAmount={convertedAmount}
            />
     
     <HistoricalRates
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              apiKey={API_KEY}
              apiBaseUrl={API_BASE_URL}
            />

     </div>
      </div>
    </div>
    </div>
  );
};

export default App