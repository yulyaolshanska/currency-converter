import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/index";

interface ApiResponse {
  rates: {};
}

const apiKey = process.env.REACT_APP_FIXER_API_KEY;

const CurrencyConverter: React.FC = () => {
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(1);
  const [currency1, setCurrency1] = useState<string>("UAH");
  const [currency2, setCurrency2] = useState<string>("UAH");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${BASE_URL}?apikey=${apiKey}`
        );
        setRates(response.data.rates);
        setCurrencies(Object.keys(response.data.rates));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    currencyNumber: number
  ) => {
    const selectedCurrency = event.target.value;
    if (currencyNumber === 1) {
      setCurrency1(selectedCurrency);
      const newAmount = (amount1 * rates[currency2]) / rates[selectedCurrency];
      setAmount2(parseFloat(newAmount.toFixed(3)));
    } else {
      setCurrency2(selectedCurrency);
      const newAmount = (amount1 * rates[currency2]) / rates[selectedCurrency];
      setAmount2(parseFloat(newAmount.toFixed(3)));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const inputName = event.target.name;

    if (inputName === "amount1") {
      setAmount1(value);
      const newAmount = (value * rates[currency2]) / rates[currency1];
      setAmount2(parseFloat(newAmount.toFixed(3)));
    } else if (inputName === "amount2") {
      setAmount2(value);
      const newAmount = (value * rates[currency1]) / rates[currency2];
      setAmount1(parseFloat(newAmount.toFixed(3)));
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          value={amount1}
          name="amount1"
          onChange={(e) => handleChange(e)}
          placeholder="Enter Amount"
        />
        <select value={currency1} onChange={(e) => handleCurrencyChange(e, 1)}>
          {currencies.map((currency) => (
            <option value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="number"
          value={amount2}
          name="amount2"
          onChange={(e) => handleChange(e)}
          placeholder="Enter Amount"
        />
        <select value={currency2} onChange={(e) => handleCurrencyChange(e, 2)}>
          {currencies.map((currency) => (
            <option value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
