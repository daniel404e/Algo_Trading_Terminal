/* eslint-disable */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';


 
import Navigationbutton from "./components/Navigationbutton"
import axios from "axios";
import Volumegraphdraw from './components/Volumepremiumchart';
 import Table from "./components/Table";
 import Optionbox from  "./components/Optionbox";
import convertjstarr from './convertjsontoarrayfn';
import Login from "./components/Login"
import React, { useState, useEffect } from 'react';
import e from 'express';
import Msgbox1 from "./components/Messageboxontop"
import Msgbox2 from "./components/msbox2"  


var expnso = 0;
var prev;
var current= [['0','0','0']];
var tmp23 = ['1','2','23'];
var tosendtotable = [['0','0','0']];
var indexf = "NIFTY"


 
 

var tooptionboxexiry = [];

const Hello = () => {
  window.electron.ipcRenderer.sendMessage('ipc-example', ['pingo12']);
  
  return (
    <div>
      <h1>what-up</h1>
    </div>
  );
};



const server = "http://165.232.184.135:4100"

// const server = "http://localhost:4100"

 


export default function App() {

  var [datav   , setdatav] = useState([[]]);
  var [expirydateustate   , setexpiryno] = useState(0);
  var [loggedin , setloginstatus] = useState(0);
  var [tocreatepopuplstate , setpopupstatus] = useState(0); 
  var loginstate =0;
  var [pageusestate  , setpageno] = useState(1);
  var [noofcontractstosend  , setnoofcontractstosend] = useState(25);
  var [index  , setindex] = useState("NIFTY");
  var [msgboxstate1  , setmsgboxstate1] = useState(0);
  var [msgboxstate2  , setmsgboxstatw2] = useState(0);
  var [spotlightdata , setspotlightdata] = useState("");


  function changemsgboxstat1 ()
  {
    setmsgboxstate1(1);
  }

  function changemsgboxstat2 ()
  {
    setmsgboxstatw2(1);
  }


  function changepagestate(pageno)
  {

      setpageno(pageno);
    
  }



  function checkifuseravaliable (unameandpassword)
{

 
  var uri = server+"/auth/"+unameandpassword.user_name+"/password/"+ unameandpassword.password ;
axios.get(uri).then((response) => {

//console.log(response)
console.log("ssssassq "+response.data);



if(response.data == 1)
{
  loginstate =1;
  
  setloginstatus (1);
  
}
else
{
  loginstate = response.data;
  
setpopupstatus(response.data);
  
}

}
)

}




  
  function changeexpusestate(expnoa)
  {
         console.log("lolapaloza  "+expnoa);
    setexpiryno((prevs) => {
      
      var verytemp1;
      if(prevs != expnoa)
      {
        verytemp1 = expnoa ;
      }
      else
      {
        verytemp1 = prevs;
      }

      return(verytemp1)
    
    
    
    }); 
    expnso = expnoa;
     

  }

  function changenoofcontracts(vall)
  {

    setnoofcontractstosend(vall)

  }

  function changeindex(ivall)
  {

    setindex(ivall)
    indexf=String(ivall)

  }
    
   
  useEffect(() => {
    ////////////////////////////////////////////////////////////////
    var uri2 = server+"/spotlight" ;
    axios.get(uri2).then((response) => {
    
    //console.log(response)
    console.log("sssasd "+response.data);
    var temp989 = String( response.data)
    setspotlightdata(temp989)
    
   
    
    }
    )
    //////////////////////////////////////////////////////////////////
    const interval = setInterval(() => {

    
   
      axios.get(server+"/"+indexf).then((response) => {
        
      console.log("this is america",response.data)
         if(response.data.records)
         {
         current = convertjstarr(response.data , expnso);
         tooptionboxexiry = response.data.records.expiryDates;
         tosendtotable = current;
         }
        console.log("this is curent"+JSON.stringify(current));
        //  console.log(JSON.stringify(prev));
    
          if(JSON.stringify(current) === JSON.stringify(prev))
          { 
            console.log("no change");
             
          
            
          }
          else
          {
            console.log("changed");
            setdatav(current);
            

          }


          
    
        
      }).catch(function (error) {
        console.log("this is america",error)
        console.log(error);
      });
      
      
           
      
        prev = current;
        console.log(current[0]);
        console.log(tmp23);


      
   
    
    }, 3000)
    return () => clearInterval(interval);
  }, []);
  


  return (
    <div>
  { (loggedin)?<div>
   
    {(pageusestate == 1) ?  

        
      (msgboxstate1 ==0 )? <Msgbox1  thefunction1={changemsgboxstat1}/>   : <div></div>

       :   

        
       (msgboxstate2 ==0 )?<Msgbox2  thefunction2={changemsgboxstat2} />   : <div></div>
 
     }
          {
       <div className='simplydiv'>

       <Navigationbutton buttonname="Option Chain"   keyval="1"  functiontochangepage={changepagestate}  shouldaddcladd={(pageusestate == 1) ? "clicked": ""}  />
        <Navigationbutton buttonname="Premium-Volume" keyval="2" functiontochangepage={changepagestate}   shouldaddcladd={(pageusestate == 2) ? "clicked": ""} /> 
       
        </div>}

      <Optionbox expirydata={tooptionboxexiry} changeindecfunction={changeindex} changeexpnofunction = {changeexpusestate} changenoofcontractsfunction = {changenoofcontracts}  changepageno = {changepagestate}/>
      
     {(pageusestate == 1) ?    <Table datat = {tosendtotable} noofcontracts={noofcontractstosend}/>  : <Volumegraphdraw datat = {tosendtotable} noofcontracts={noofcontractstosend}/>  
     }
        
      
      
         
     

     


  </div> :   <Login returnfn={checkifuseravaliable} statusofl={tocreatepopuplstate} spotlightcontent={spotlightdata}  /> 
  
  
  
  }


  </div>

  );
}
