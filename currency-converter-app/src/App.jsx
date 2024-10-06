//importing necessary dependancies and custom components

import React, {useState,useEffect} from 'react'
//import axios from 'axios';
import CurrencySelector from './components/CurrencySelector.jsx';
import AmountInput from './components/AmountInput.jsx';
import ConversionResult from './components/ConversionResult.jsX';
import HistoricalRates from './components/HistoricalRates.jsx';
import DarkMode from './components/DarkMode.jsx';


const API_KEY = '3a902d0a157e4c5e795ed257';
    

const App = () => {
  

  //Creating state variables

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
 
    
 
  // Function to swap the 'from' and 'to' currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };


  //Function to fetch the exchange rate and update the result
  const getExchangeRate = async () => {
    
        setIsLoading(true);
        setError(null); //For Reseting error before new fetch
    
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
            if(!response.ok) throw new Error("Something went wrong!");
    
            const data = await response.json();
            const rate = (data.conversion_rates[toCurrency] * amount).toFixed(2); //Sets the results of toFixed into 2 decimal points
            setConvertedAmount(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch exchange Rate. Please try again later!')
        } finally {
            setIsLoading(false);
        }
      }

     /* 
  // Variable to handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault(); //prevents default form actions
  getExchangeRate();
}
*/

//Fetch exchange rate initial render
useEffect(() => {
  getExchangeRate();
 }, [fromCurrency, toCurrency, amount]);


  /*
//creating useEffect hook that runs once when the component mounts, fetchees and stores Api results in rates states
useEffect(() => {
  const fetchRates = async () => {
    try{
      const result = await axios.get(`${API_BASEURL}/${API_KEY}/latest/USD`);
      setRates(result.data.conversion_rates);
    }catch (error){
      setError('Failed to fetch rates. Please try again!')
    }
  };

  fetchRates();
}, []);


//Setting useEffect hook to perfom currency conversion
useEffect(()=>{
  if (rates[toCurrency]) {
     const response = (amount * rates[toCurrency]) / rates[fromCurrency];
     setConvertedAmount(response.toFixed(2)); //sets results to 2 decimal points
  }
}, [amount, fromCurrency, toCurrency, rates]);
*/


//setting event handler functions to update states whenever user input changes
//const handleFromCurrencyChange = (currency) => setFromCurrency(currency);
//const handleToCurrencyChange = (currency) => setToCurrency(currency);
const handleDarkModeToggle = () => {
  setIsDarkMode((prev) => !prev);
};


//Setting Dynamic class for dark Mode feature
const darkContainer = `min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`;

  return (
    <div className={`h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#89CFF0] to-white'}`}>
      <div className="continer mx-auto px-4 py-4 max-w-md h-[80vh]">
        <div className={`bg-white dark:bg-gray-800 p-7 rounded-lg shadow-xl max-w-md w-full transition-all duration-300`}>
        <h1 className="text-xl font-bold mb-5 text-center">Don's Currency Converter</h1>
        <DarkMode isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
     {error && <div className="text-red-500 mb-4">{error}</div>}
   
     <div className="space-y-4">
        <CurrencySelector 
        selectedCurrency={fromCurrency}
        label="From"

       // onChange={handleFromCurrencyChange}
        handleCurrency={(e) => setFromCurrency(e.target.value)} // Update fromCurrency state
        />

{/* Currency swap button 
<div className="swap-icon flex justify-center" onClick={handleSwapCurrencies}>
          <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>*/}

       <CurrencySelector 
selectedCurrency={toCurrency}
       label="To"
     
      // onChange={handleToCurrencyChange}
       handleCurrency={(e) => setToCurrency(e.target.value)} // Update fromCurrency state
       />

       <AmountInput 
       value={amount}
       placeholder="Enter amount"
       onChange={(value) => {
        setAmount(value);
        getExchangeRate(); // Fetch new rate whenever the amount changes
      }}
      required
       />
     
       <ConversionResult
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              amount={amount}
              convertedAmount={convertedAmount}
              isLoading={isLoading} // Passed loadng state for better UX
            />
     
     <HistoricalRates
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              apiKey={API_KEY}
              apiBaseUrl={`https://v6.exchangerate-api.com/v6/${API_KEY}`}
            />
     </div>

  {/* Submit button to trigger exchange rate fetch */}
     <button type="button" 
      onClick={getExchangeRate} 
      className={` ${isLoading ? "loading" : ""} mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300`}>
      {isLoading ? "Fetching..." : "Get Exchange Rate"}
      </button>

{/* Display the exchange rate result if available 
     <p className="mt-4">{isLoading ? "Fetching exchange Rate" : convertedAmount}</p> */}

      </div>
    </div>
    </div>
  );
};

export default App