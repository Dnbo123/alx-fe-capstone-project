

const AmountInput =({value, onChange}) =>{

  return (
<div className="flex flex-col">
<label htmlFor="amount" className="mb-1 font-medium text-gray-700 text-sm">
  Enter Amount...
</label>
<input 
   id="amount"
   type="number"
   value={value}
   onChange={(e) => onChange(parseFloat(e.target.value) || 0)} // parseFloat ensures the onChange handler receives a number
   min="0"
   step="0.01"
   className="p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm h-8"/>

</div>
  );
};

export default AmountInput