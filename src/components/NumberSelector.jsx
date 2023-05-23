import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const NumberSelector = () => {
  const [value, setValue] = useState(0);

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  return (
    <InputGroup style={{width:"110px"}}>
      <Button variant="outline-secondary" onClick={handleDecrease}>-</Button>
      <FormControl
        type="text"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
    </InputGroup>
  );
};

export default NumberSelector;
