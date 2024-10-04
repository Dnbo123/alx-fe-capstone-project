import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const HistoricalRates = ({ fromCurrency, toCurrency, apiKey, apiBaseUrl }) =>{

const [historicalData,setHistoricalData] = useState([]);
const [error, setError] = useState(null);

//setting useEffect hook to fetch data when currencies are changed
useEffect(() => {
    const fetchHistoricalData = async () => {
        try{
            //Creating function to get dates for the last 7 days
            const dates = Array.from({length:7}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();

            //fetching data for each date
            const dateGetter = dates.map(date =>
                axios.get(`${apiBaseUrl}/${apiKey}/history/${fromCurrency}/${date}`)
            );
            //using Promise.all to wait for all promises to resolve
            const responses = await Promise.all(dateGetter);

            //processing and formatting data
               const formattedData = responses.map((response,index) => ({
                date: dates[index],
                rate: response.data.conversion_rates[toCurrency]
               }));

               setHistoricalData(formattedData);
               setError(null);
        } catch (error) {
            setError('Failed to Load Historical data. Try again Later');
        }
    };
    fetchHistoricalData();
}, [fromCurrency, toCurrency, apiKey, apiBaseUrl]);

if (error) {
    return <div className="text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="mt-8">
       <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-300">Exchange Rate History (Last 7 Days)</h2>
       {/*Setting up a responsive container html*/}
       <ResponsiveContainer width="100%" height={300}>

        {/*Creating the Line Chart*/}
           <LineChart data={historicalData}>
           <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis dataKey="date" stroke="#aaa"/>
          <YAxis stroke="#aaa"/>
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="#8884d8" />
           </LineChart>
       </ResponsiveContainer>
    </div>
  )
}

export default HistoricalRates