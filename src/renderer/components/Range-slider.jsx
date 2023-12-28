/* eslint-disable */
import React, { useState } from 'react';
import { CFormRange } from '@coreui/react';
import "./Range-slider.css"

const STEP = 0.1;
const MIN = 0;
const MAX = 100;



function Rangeslider(propss) 
{
    

    var [val   , setvals] = useState(25);
    var [slidercss   , setslidercss] = useState("heading4 hide");
    //heading4 show
     //heading4 hide

    
 
  

    return(
        <div>
        <div className='popup'>
        <h6 className= {slidercss}>No. of Contracts {val}</h6>
         </div>
        <CFormRange min="20" max="60" step="10"  defaultValue="25"    value={val}  onChange={(e)=>{ 
            
            
            setvals(e.target.value);
        
            setslidercss("heading4 show");

          var t=  setTimeout(() => {

                setslidercss("heading4 hide");
                clearTimeout(t);
    
              }, 2500);

            propss.functiontochangenoofcontracts(e.target.value);
        
        
               }} />
        </div>
    )
}


export default Rangeslider ;