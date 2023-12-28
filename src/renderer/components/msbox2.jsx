/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './Messageboxontop.css'






 
function Msgbox(props) {

    const [clickclosebuttonstate1 , setclosebuttonstate1] = useState(0)

 
   

      
 
 
     
    return (

         
       <div> 

{

     (clickclosebuttonstate1 == 0)?   <div class="alert">
  <span class="closebtn" onClick=  { () => {setclosebuttonstate1(1) ; props.thefunction2() }}  >&times;</span> 
  
  <ul className='no-bullets'>
  <li><h1 className='greenbox'>__</h1> <strong> Intrensic Premium</strong>  </li>
<li><h1 className='redbox'>__</h1>  <strong> Mispriced Premiums</strong>  </li>
<li><h1 className='yellowbox'>__</h1>  <strong> Volume at Contract</strong>  </li>
</ul>
</div>  
: <div></div>


}

   </div>     
        
         
    )
  }
  
  export default Msgbox;
  


