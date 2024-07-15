import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExchangeTable from './Components/ExchangeTable'
import Dropdown from './Components/Dropdown'


const API_BASE_URL = "http://localhost:8080/api";


function App() {

  const [currencies, setCurrencies] = useState([])
  const [baseCurrency, setBaseCurrency] = useState("CNY")
  const [exchangeRates, setExchangeRates] = useState(null);


  const handleChange = (event) => {
    setBaseCurrency(event.target.value)
  }
 
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/currencies`);
      if (response.ok) {
        const data = await response.json();
        setCurrencies(data);
      } else {
        console.error('Failed to fetch currencies');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/exchange-rates/${baseCurrency}`);
      if (response.ok) {
        const data = await response.json();
        setExchangeRates(data);
      } else {
        console.error('Failed to fetch exchange rates');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchCurrencies()
   
  }, []);

  useEffect(() => {
    if (baseCurrency) {
      fetchExchangeRates();
    }
  }, [baseCurrency]);


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Vite + React</h2>
      <Dropdown currencies={currencies} handleChange={handleChange} />
      <ExchangeTable currencies = {currencies} baseCurrency = {baseCurrency} exchangeRates={exchangeRates} />
    </>
  )
}

export default App
