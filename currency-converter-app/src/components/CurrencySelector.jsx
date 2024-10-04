import React from 'react';

//Creating an array of currency codes and a function to get the country code for flag display
const currencyCodes = [
  "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
  "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
  "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
  "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
  "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
  "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
  "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
  "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
  "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
  "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
  "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
  "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
  "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
  "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
  "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
  "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
  "ZWL"
];

//Setting up currency selector arrow function
const CurrencySelector = ({selectedCurrency, label, handleCurrency}) => {

//Extract the country code from the selected currency code
const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="flex flex-col">
      <label htmlFor={`currency-${label}`} className="mb-2 font-medium text-gray-700">
        {label}
        </label>
    <div className="relative">
    <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="flag"/>
    <select
        id={`currency-${label}`}
        //Changing value of fromCurrency and toCurrency to selected currency code
        onChange= {handleCurrency}
        value={selectedCurrency}
        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          
          {currencyCodes.map(currency => (
            <option key={currency} value={currency}>{currency}</option> 
           ))}            
        </select>
       
       
        {/*Creating a custom dropdown arrow
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg  className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        </div>
        */}
     </div>
    </div>
  );
};

export default CurrencySelector;