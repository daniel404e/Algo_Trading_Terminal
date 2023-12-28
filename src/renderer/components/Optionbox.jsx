/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './Optionbox.css';
import Dropdown from "./Dropdownbox"
import Dropdown2 from "./Dropdownbox2"
import Navigationbutton from "./Navigationbutton"
import Rangeslider from "./Range-slider"






var optiontosend = [];
function Optionbox(props) {


    function reachappandchangeexpiry(expno)
{

    props.changeexpnofunction(expno);

}

function reachappandchangenoofcontracts(noofcont)
{

    props.changenoofcontractsfunction(noofcont);

}

function reachchangeindex(index)
{

    props.changeindecfunction(index);

}

function reachappandchangepage(pageno)
{

    props.changepageno(pageno);
    

}
     
    var expirydatesdata = props.expirydata;
    

    const optiontosend2 = [
        { value: 'NIFTY', label: 'NIFTY' },
        { value: 'BANKNIFTY', label: 'BANKNIFTY' },
        { value: 'FINNIFTY', label: 'FINNIFTY' },
      ];

    expirydatesdata.forEach((element,indexs) => {

        var temppp = { value: indexs, label: element }
        optiontosend[indexs]=(temppp);
        
    });

      console.log("this is from option box:::" + expirydatesdata);     
            
 
 
     
    return (
        
       <div className='boxmod'>
 
 
       <div className="simplydiv23">
       
       
        

  <Dropdown2   expirydatasent = {optiontosend2} functiontochangeexpiry={reachchangeindex} placeholder="Index"/>     
   
       
       
       
   
        <Dropdown   expirydatasent = {optiontosend} functiontochangeexpiry={reachappandchangeexpiry} placeholder="Expiry"/>


 
      
  
  

      </div>
     
     <div className="simplydiv233">
      <Rangeslider      functiontochangenoofcontracts={reachappandchangenoofcontracts}  />     
      </div>
        
     </div>
    );
  }
  
  export default Optionbox;
  


