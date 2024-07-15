import React from 'react';

const Dropdown = (props) => {
  const { currencies, handleChange } = props;

  return (
    <div className="dropdown-container">
      <select className="dropdown-select" onChange={handleChange}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
