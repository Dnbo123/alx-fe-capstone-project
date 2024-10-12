import React, {useState} from 'react';
import Select from 'react-select';

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

//Creating options for react-select from the currency codes
const currencyOptions = currencyCodes.map((code) => ({
  value: code,
  label: code,
}));

//Setting up currency selector component
// This component allows the user to select a currency from a dropdown list.
// and takes three props: selectedCurrency, label, and handleCurrency.
const CurrencySelector = ({selectedCurrency, label, handleCurrency,}) => {
  const [inputValue, setInputValue] = useState('');
//Extract the country code from the selected currency code
const countryCode =selectedCurrency ? selectedCurrency.substring(0, 2) : 'US';

const handleInputChange = (inputValue) => {
  setInputValue(inputValue);
};

const filteredOptions = currencyOptions.filter(option =>
  option.label.toLowerCase().includes(inputValue.toLowerCase())
);

  return (
    <div className="flex items-center space-x-2 mb-5">
    {/* Label for the currency selector */}
      <label htmlFor={`currency-${label}`} className=" font-large text-gray-700 text-lg">
        {label}
        </label>
         {/* Container for the flag and dropdown */}
    <div className="flex items-center space-x-2">
     {/* Flag for the selected currency */}
    <img 
    src={`https://flagsapi.com/${countryCode}/flat/64.png`}
    alt="flag" 
    className="w-6 h-4"/>

    {/* React-Select dropdown for currency selection */}
    <Select
        id={`currency-${label}`}
        //Changing value of fromCurrency and toCurrency to selected currency code
        value={currencyOptions.find(option => option.value === selectedCurrency)}
        onChange= {(selectedOption) => handleCurrency(selectedOption.value)}
        options={filteredOptions}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        className="p-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        classNamePrefix="select"
        isSearchable={true}
        placeholder="select Currency"
      />
     </div>
    </div>
  );
};

export default CurrencySelector;