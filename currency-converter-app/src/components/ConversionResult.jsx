import React from 'react';

const ConversionResult =({ fromCurrency, toCurrency, amount, convertedAmount, isLoading}) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md shadow-md transition-all duration-300">
      <h2 className="text-lg font-semibold mb-2">Results for Conversion</h2>
      {isLoading ? (
        <p className="text-gray-700 dark:text-gray-300">Fetching exchange rate...</p>
      ): (
        <div>
    <p className="text-gray-700 ark:text-gray-300" >
        {amount} {fromCurrency} =
      </p>
      <p className="text-2xl font-bold text-green-600 dark:text-green-300">
        {convertedAmount} {toCurrency}
      </p>
        </div>
      )}
    </div>
  )
}

export default ConversionResult