//importing necessary dependancies and custom components

import React, {useState,useEffect} from 'react'
//import axios from 'axios';
import CurrencySelector from './components/CurrencySelector.jsx';
import AmountInput from './components/AmountInput.jsx';
import ConversionResult from './components/ConversionResult.jSX';
import HistoricalRates from './components/HistoricalRates.jsx';
import DarkMode from './components/DarkMode.jsx';


const API_KEY = import.meta.env.VITE_API_KEY;
    

const App = () => {

  //Creating state variables

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // Function to swap the 'from' and 'to' currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };


  //Function to fetch the exchange rate and update the result
  const getExchangeRate = async () => {
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
    
        setIsLoading(true);
    
        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw Error("Something went wrong!");
    
            const data = await response.json();
            const rate = (data.conversion_rate * amount).toFixed(2); //Sets the results of toFixed into 2 decimal points
            setConvertedAmount(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
      }

      
  // Variable to handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault(); //prevents default form actions
  getExchangeRate();
}


//Fetch exchange rate initial render
useEffect(() => getExchangeRate, []);


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
const handleDarkModeToggle = () => setIsDarkMode(!isDarkMode);


//Setting Dynamic class for dark Mode feature
const darkContainer = `min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`;

  return (
    <div className={darkContainer}>
      <div className="continer mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-1g shadow-md max-w-md mx-auto">
        <h1 className="tet-2xl font-bold mb-6 text-center">Don's Currency Converter</h1>
        <DarkMode isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
     {Error && <div className="text-red-500 mb-4">{Error}</div>}
     <form onchange={handleFormSubmit}>
     <div className="space-y-4">
        <CurrencySelector 
        label="From"
        value={fromCurrency}
       // onChange={handleFromCurrencyChange}
        handleCurrency={(e) => setFromCurrency(e.target.value)} // Update fromCurrency state
        />

{/* Currency swap button */}
<div className="swap-icon" onClick={handleSwapCurrencies}>
          <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

       <CurrencySelector 
       label="To"
       value={toCurrency}
      // onChange={handleToCurrencyChange}
       handleCurrency={(e) => setToCurrency(e.target.value)} // Update fromCurrency state
       />

       <AmountInput 
       type="number"
       value={amount}
       placeholder="Enter amount"
       onChange={(e) => setAmount(e.target.value)} // Update amount state on input change
       required
       />
     
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
              apiBaseUrl={API_URL}
            />
     </div>

  {/* Submit button to trigger exchange rate fetch */}
     <button type="Submit" className={`${isLoading ? "loading" : ""}`}>Get Exchange rate</button>

{/* Display the exchange rate result if available */}
     <p>{isLoading ? "Fetching exchange Rate" : convertedAmount}</p>
     </form>
      </div>
    </div>
    </div>
  );
};

export default App