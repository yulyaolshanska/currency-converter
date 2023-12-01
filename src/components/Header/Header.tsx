import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../constants";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/latest?&base=UAH&symbols=EUR,USD,UAH&apikey=${API_KEY}`
        );
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <header className={styles.header}>
      {exchangeRates && (
        <div className={styles.ratesContainer}>
          <p className={styles.title}>Exchange Rates:</p>
          <ul className={styles.ratesList}>
            <li>USD : {(1 / exchangeRates.USD).toFixed(1)} UAH</li>
            <li>EUR : {(1 / exchangeRates.EUR).toFixed(1)} UAH</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
