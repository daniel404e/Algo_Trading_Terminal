/* eslint-disable */
 import React, { useState, useEffect } from 'react';
 import './Table.css';

import Tableentry from './Tableentry'

var dattotat = [[0,0,0]];


function Table(props) {

  var noofcontractstoprint=props.noofcontracts;
var pointsofdivergence = noofcontractstoprint * 50;

    console.log("this is props "+ props.datat);
           
    dattotat = props.datat;
     
    return (
     
  
      <div  >
         
          <table   style={{height: "100vh", width: (window.innerWidth < 600)? window.innerWidth : "50px"}}>
                <thead>
                <tr>
                    <th>CALLS </th>
                    <th> STRIKE-PRICE </th>
                    <th> PUTS </th>
                     
                </tr>
                </thead>
                <tbody style={{opacity: 1}}>
                     
                         {
                          
                            dattotat.map((elem,indexw) => {

                                     var upperbound = elem[3] + pointsofdivergence;
                                     var lowerbound = elem[3] - pointsofdivergence;
                                     if(elem[1] > lowerbound &&  elem[1] < upperbound)
                                     {
                                        return(<Tableentry key={indexw} vals={[elem[0],elem[1],elem[2]]} underlyingvalue={elem[3]}   />)
                                     } 
                                
                                 

                            })

                         }
                     
                     
                        
                </tbody>
            </table>
            
      </div>
    );
  }
  
  export default Table;
  