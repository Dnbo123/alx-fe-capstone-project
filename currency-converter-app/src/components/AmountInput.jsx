

const AmountInput =({value, onChange}) =>{

  return (
<div className="flex flex-col">
<label htmlFor="amount" className="mb-2 font-medium text-gray-700">
  Enter Amount...
</label>
<input 
   id="amount"
   type="number"
   value={value}
   onChange={(e) => onChange(parseFloat(e.target.value))} // parseFloat ensures the onChange handler receives a number
   min="0"
   step="0.01"
   className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>

</div>
  );
};

export default AmountInput