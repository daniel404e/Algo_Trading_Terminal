/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './Messageboxontop.css'






 
function Msgbox(props) {

    const [clickclosebuttonstate , setclosebuttonstate] = useState(0)

 
   

      
 
 
     
    return (

         
       <div> 

{

     (clickclosebuttonstate == 0)?   <div class="alert">
  <span class="closebtn" onClick=  { () => {setclosebuttonstate(1) ; props.thefunction1() }}  >&times;</span> 
  
<ul className='no-bullets'>

<li><h1 className='bluebox'>__</h1>  <strong> Listed Premium</strong>  </li>
<li><h1 className='redbox'>__</h1>   <strong> Strike Difference from ATM(underlying - Strike) </strong>  </li>
<li><h1 className='greenbox'>__</h1> <strong> Intrensic Premium /Discount</strong>  </li>


</ul>  
  

</div>  
: <div></div>


}

   </div>     
        
         
    )
  }
  
  export default Msgbox;
  


