

const ConversionResult =() => {
  return (
    <div>
      <h2>Results for Conversion</h2>
      <p>
        {amount} {fromCurrency} =
      </p>
      <p>
        {convertedAmount} {toCurrency}
      </p>
    </div>
  )
}

export default ConversionResult