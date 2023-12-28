/* eslint-disable */
import React, { useState } from 'react';
import Select from 'react-select';
import './dropdwnbox.css'



export default function Dropdown(propsw) {

    const options =  propsw.expirydatasent;


  const [selectedOption, setSelectedOption] = useState(propsw.expirydatasent[0]);

  return (
    <div className="drpdown1">
      <Select
        defaultValue={selectedOption}
        onChange={(valo)=>{setSelectedOption(valo); 
        
        console.log("webespecial"+" "+valo.value);
        propsw.functiontochangeexpiry(valo.value)
        
        }}
        options={options}
      />
    </div>
  );
}