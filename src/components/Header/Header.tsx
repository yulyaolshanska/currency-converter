import React, { useState, useEffect } from "react";
import axios from "axios";

const Header: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setExchangeRate(response.data.rate);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });
  }, []);

  return (
    <header>
      <h1>Exchange Rate: {exchangeRate} UAH</h1>
    </header>
  );
};

export default Header;
