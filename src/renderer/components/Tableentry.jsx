/* eslint-disable */
import React, {useEffect, useState} from 'react';
import formulaf from './formula';
import calculatefairvalue from './formula'
import Graphdraw from './Graphexample'
import "./Tablentry.css";

function Tableentry(props) {
          
    var integratedvalues = [props.vals[0],props.vals[1],props.vals[2],props.underlyingvalue]
    var todisplay = calculatefairvalue(integratedvalues)
    console.log(todisplay)

     
    




    return (

                 <tr >
                            
                            

                        <td   style={{backgroundColor: (props.vals[1] < props.underlyingvalue) ? "rgb(223,1,19,0.2)" : "hsla(150, 100%, 75%, 0.4)"   }} >
                        <div style={{height: (window.innerWidth < 600)? "55px" : "56px"   ,width: (window.innerWidth < 600)? "80%" : "100%" ,position:"relative", marginBottom:"1%", marginTop:"1%", padding:"1%"}}>
     
                          <Graphdraw datad={[todisplay.CE.callactualpremium,todisplay.CE.zdelta,todisplay.CE.callrealpremium]} putorcall={"C"}  />
                          
                            </div>
                        
                        </td>
                        <td style={{textAlign: "center", width: (window.innerWidth < 600)? "50px" : "100%"}}> 
                        <div style={{  height: (window.innerWidth < 600)? "55px" : "56px", width: (window.innerWidth < 600)? "50px" : "100%" ,position:"relative" }}>
                        <h1  style={{fontSize: (window.innerWidth < 600)? "100%" : "120%",position:"relative" }} >{props.vals[1]}</h1>
                        </div>
                        </td>
                        <td style={{backgroundColor: (props.vals[1] > props.underlyingvalue) ? "rgb(223,1,19,0.2)" : "hsla(150, 100%, 75%, 0.4)" }}>
                         
                        <div style={{height: (window.innerWidth < 600)? "55px" : "56px", width: (window.innerWidth < 600)? "80%" : "100%" ,position:"relative", marginBottom:"1%", marginTop:"1%", padding:"1%"}}>
     
                        <Graphdraw datad={[todisplay.PE.putactualpremium,todisplay.PE.zdelta,todisplay.PE.putrealpremium]}   putorcall={"P"}  />
                        
                        </div>

                        </td>
                        
                        
                        
                 </tr>

          );
}


export default Tableentry;