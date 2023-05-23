import React from 'react'
import {useState} from "react"
import Form from 'react-bootstrap/Form';


const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar