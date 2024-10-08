import React from 'react';

const ConversionResult =({ fromCurrency, amount, convertedAmount, isLoading}) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md shadow-md transition-all duration-300 max-h-[180px]">
      <h2 className="text-md font-lg mb-3">Results for Conversion</h2>
      {isLoading ? (
        <p className="text-sm text-gray-700 dark:text-gray-300">Fetching exchange rate...</p>
      ): (
        <div>
    <p className="text-sm text-gray-700 ark:text-gray-300" >
        {amount} {fromCurrency} =
      </p>
      <p className="text-lg font-semibold text-green-600 dark:text-green-300">
        {convertedAmount} 
      </p>
        </div>
      )}
    </div>
  )
}

export default ConversionResult