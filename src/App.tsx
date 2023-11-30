import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Header from "./components/Header/Header";
import React from "react";

const App: React.FC = () => {

  return (
    <div>
      <Header />
      <CurrencyConverter />
    </div>
  );
};

export default App;
