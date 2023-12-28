/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './Errormsg.css'






 
function Errormsgs(props) {

 
      
 
 
     
    return (

        <div>{     
            
              
            
             <div className={'boxmod2 '+props.classes}>
       <div className="simplydiv2">
         <h1>{props.msg}<span  >&#128557;</span></h1>
      </div>
     </div>
      
      
      
        } 
        
        
        </div>
    )
  }
  
  export default Errormsgs;
  


