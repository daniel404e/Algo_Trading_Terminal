/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './Navigationbutton.css';
 




function Navigationbutton(props) {

            




 
     
    return (
        
      
         <button class={props.shouldaddcladd+" button1"} onClick={()=>{ props.functiontochangepage(props.keyval)  }}   >{props.buttonname} </button>
      
    );
  }
  
  export default Navigationbutton;