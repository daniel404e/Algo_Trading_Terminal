/* eslint-disable */

import React, { useState, useEffect } from 'react'
import './Loginp.css'
import Errorbox from "./Errormsgbox"
import Msgbx from "./msgboxlogin"

function Loginform(props)
{
  const [inputw , setinput] = useState(  {
        
    user_name: "",
    password:""
  } );

  var [timeoutsec , settimeoutsec] = useState(props.statusofl);



  function handlesubmit(e)
  {
         
    e.preventDefault();
 
    if(inputw.user_name && inputw.password)
    {
    var temp34 = inputw;
       
    setinput({
            
      user_name: "",
      password:""
    });
       
    props.returnfn(temp34);

  }   

           
      

  }



  function  handlechange(e)
  {
     e=e.target;
    console.log(e );
    settimeoutsec(0);
    console.log(inputw);
    if(e.name == "username")
    {
        var tmpcont = inputw.password;
        var tmptitle = e.value;
        var tmppkg = {user_name: tmptitle , password: tmpcont} ;

        setinput(tmppkg);
    }
    if(e.name == "password")
    {
        var tmpcont = e.value;
        var tmptitle = inputw.user_name;
        var tmppkg = {  user_name: tmptitle , password: tmpcont} ;

        setinput(tmppkg);
    }
        
  }

//props.statusofl



if(props.statusofl == -1 && timeoutsec != -1)
{

  settimeoutsec(-1);
 
 

}

if(props.statusofl == -2 && timeoutsec != -2)
{

  settimeoutsec(-2);
  
}



 

 

    return(
      <div>
      <Msgbx toprint3={props.spotlightcontent}/>

<div class="login-page center1">
         {  (timeoutsec == -1 )?    <Errorbox msg="Username not found" classes="m-fadeIn"/>   : ((timeoutsec == -2 )?  <Errorbox msg="Incorrect Password" classes="m-fadeIn"/>   : <span> </span>)}
 
  
  <div class="form2">
  <h1>Login<span >&#128526;</span></h1>
       <form class="login-form">
      <input type="text" name="username" placeholder="username"   onChange={   handlechange    }  value={inputw.user_name} />
      <input type="password" name="password" placeholder="password"   value={inputw.password}  onChange={ (eq) => { handlechange(eq) }} />
      <button  onClick={handlesubmit} >Login</button>
       
    </form>
  </div>
</div>


 

</div>



    )

}




export default Loginform