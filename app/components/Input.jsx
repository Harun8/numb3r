

import React from 'react'
import "../globals.css"

const Input = ({ value, onChange, correctPlace, correctNumber }) => {

    // console.log('correctPlace:', correctPlace);
    // console.log('correctNumber:', correctNumber);
    

    let className = ' form_width text-center shadow-sm  rounded mx-1  ';
    if (correctPlace) {
      className += ' correctPlace';
    } else if (correctNumber) {
      className += ' correctNumber';
    }
    return (
      <input
        className={className}
        type='text'
        maxLength={1}
        value={value}
        onChange={onChange}
      />
    );
  };

export default Input