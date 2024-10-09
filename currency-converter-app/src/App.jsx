//importing necessary dependancies and custom components

import React, {useState,useEffect} from 'react'
import CurrencySelector from './components/CurrencySelector.jsx';
import AmountInput from './components/AmountInput.jsx';
import ConversionResult from './components/ConversionResult.jsx';
import DarkMode from './components/DarkMode.jsx';

//Echange rate api
const API_KEY = '3a902d0a157e4c5e795ed257';
    
//App component
const App = () => {
  

  //Creating state variables to store current state of the application

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
 

  //Function to fetch the exchange rate and update the result
  // (Called when the user changes the from or to currency, or amount)
  const getExchangeRate = async () => {
    
    // Set the loading state to true to indicate that the application is loading the conversion result
        setIsLoading(true);
        setError(null); //For Reseting error before new fetch
    
        try {
          // Fetch the exchange rate from the API
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
            // Check if the response was successful
            if(!response.ok) throw new Error("Something went wrong!");
    
             // Parse the response data as JSON
            const data = await response.json();
            const rate = (data.conversion_rates[toCurrency] * amount).toFixed(2); //Sets the results of toFixed into 2 decimal points
            setConvertedAmount(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch exchange Rate. Please try again later!')
        } finally {
          // Setting the loading state to false to indicate that the application has finished loading the conversion result
            setIsLoading(false);
        }
      }

  

//Fetch exchange rate initial render
useEffect(() => {
  getExchangeRate();
 }, [fromCurrency, toCurrency, amount]);


 
const handleDarkModeToggle = () => {
   // Toggle the dark mode state
  setIsDarkMode((prev) => !prev);
};


//Setting Dynamic class for dark Mode feature
const darkContainer = `min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`;

//achieved mobile responsiveness through a series of tailwind css breakpoints that apply different styles based on the screen size.
  return (
    // The main application container
    <div className={`h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#89CFF0] to-white'}`}>
      <div className="continer mx-auto px-5 py-5 max-w-2xl h-[90vh]">
        <div className={`bg-white dark:bg-gray-800 p-7 rounded-lg shadow-xl max-w-md w-full transition-all duration-300`}>
        <h1 className="text-xl font-bold mb-6 text-center">Don's Currency Converter</h1>
        <DarkMode isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
     {error && <div className="text-red-500 mb-4">{error}</div>}
   
     <div className="space-y-4">
        <CurrencySelector 
        selectedCurrency={fromCurrency}
        label="From"

       // onChange={handleFromCurrencyChange}
        handleCurrency={(e) => setFromCurrency(e.target.value)} // Update fromCurrency state
        />

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
     
    

  {/* Submit button to trigger exchange rate fetch */}
     <button type="button" 
      onClick={getExchangeRate} 
      className={` ${isLoading ? "loading" : ""} mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300`}>
      {isLoading ? "Fetching..." : "Get Exchange Rate"}
      </button>

      </div>
      </div>
    </div>
    </div>
  );
};

export default App