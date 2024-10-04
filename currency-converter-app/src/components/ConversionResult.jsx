import React from 'react';

const ConversionResult =({fromCurrency, toCurrency, amount, convertedAmount}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Results for Conversion</h2>
      <p  className="text-gray-700">
        {amount} {fromCurrency} =
      </p>
      <p className="text-2xl font-bold text-green-600">
        {convertedAmount} {toCurrency}
      </p>
    </div>
  )
}

export default ConversionResult