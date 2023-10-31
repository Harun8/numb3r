

import React, {useEffect} from 'react'
import "../globals.css"

const Input = React.forwardRef(({ value, onChange, correctPlace, correctNumber, autoFocus }, ref) => {

  useEffect(() => {
    if (focus && ref.current) {
        ref.current.focus();
    }
}, [focus]);

    let className = ' form_width text-center shadow-sm  rounded mx-1  ';
    if (correctPlace) {
      className += ' correctPlace';
    } else if (correctNumber) {
      className += ' correctNumber';
    }
    return (
      <input
  
      ref={ref}
      className={className}
        type='text'
        maxLength={1}
        value={value}
        onChange={onChange}
      />
    );
  });

export default Input