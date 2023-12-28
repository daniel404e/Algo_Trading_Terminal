/* eslint-disable */
import React from 'react';
import calculatefairvalue from './formula'
import calculatemisspricedpremiums from "./findmisspricedpremiums"
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
 

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);



export default function volumegraphdraw(props) {
    var noofcontractstoprint=props.noofcontracts;
var pointsofdivergence = noofcontractstoprint * 50;




    // var integratedvalues = [props.vals[0],props.vals[1],props.vals[2],props.underlyingvalue]
    // var todisplay = calculatefairvalue(integratedvalues)
    
    
    var labels = [];
    var allcallpremiums=[];
    var allputpremiums=[];
    var callvolume1 =[];
    var putvolume1=[];


    var indexofunderlying = 0;
    var dattotat = props.datat;
     
  

    dattotat.map((elem,indexw) => {


          var integratedvalues = [elem[0],elem[1],elem[2],elem[3],elem[4],elem[5]]

          console.log("oip"+ integratedvalues)

      var todisplay = calculatefairvalue(integratedvalues)

      
    

      var upperbound = elem[3] + pointsofdivergence;
      var lowerbound = elem[3] - pointsofdivergence;
      var midpoint = (upperbound + lowerbound)/2;

      

      if(elem[1] > lowerbound &&  elem[1] < upperbound)
      {


        if(todisplay.CE.callrealpremium < -300)
        {
            todisplay.CE.callrealpremium = 0;
            
        }

        allcallpremiums.push(todisplay.CE.callrealpremium)
                

        callvolume1.push(Math.log10 (todisplay.CE.callvolume));
        if(todisplay.PE.putrealpremium < -300)
        {
            todisplay.PE.putrealpremium = 0;
            
        }
        allputpremiums.push(todisplay.PE.putrealpremium)

        putvolume1.push(Math.log10(todisplay.PE.putvolume));
        labels.push( elem[1])
      } 
       
     
     
 
 })

 
 var misspricedpremiumsindex=calculatemisspricedpremiums(allcallpremiums,allputpremiums,indexofunderlying);
 
 

 var callmisspricedpremiumcolors=[];
 
 var putmisspricedpremiumcolors=[];

for(var i =0; i< allcallpremiums.length;i++)
{
    if(misspricedpremiumsindex[0].includes(i))
    {
        callmisspricedpremiumcolors.push("red");
    }
    else
    {
        callmisspricedpremiumcolors.push("#02ec88");
    }

}
 
for(var i =0; i< allputpremiums.length;i++)
{
    if(misspricedpremiumsindex[1].includes(i))
    {
        putmisspricedpremiumcolors.push("red");
    }
    else
    {
        putmisspricedpremiumcolors.push("#02ec88");
    }

}
  
callmisspricedpremiumcolors[0]="#02ec88"

putmisspricedpremiumcolors[0]="#02ec88"

  const data = {
  labels,
  datasets: [
    
    {
      type: 'line'  ,
      label: '',
      title:"CALLS",
      borderColor: callmisspricedpremiumcolors,
      borderWidth: 3,
      fill: false,
      data:  allcallpremiums,
      yAxisID: 'y'
    }
    
    ,

    {
        type: 'bar' ,
        label: '',
        backgroundColor: 'rgb(204,204,0)',
        data: callvolume1 ,
        borderColor: 'yellow',
        borderWidth: 2,
        yAxisID: 'y1',
      }

    
  ],
}

const data2 = {
    labels,
    datasets: [
      
      {
        type: 'line'  ,
        label: '',
        borderColor: putmisspricedpremiumcolors,
        borderWidth: 3,
        fill: false,
        data:  allputpremiums,
        yAxisID: 'y2'
      }   
      ,

    {
        type: 'bar' ,
        label: '',
        backgroundColor: 'rgb(204,204,0)',
        data: putvolume1 ,
        borderColor: 'Yellow',
        borderWidth: 2,
        yAxisID: 'y21',
      }
  
      
    ],
  }


var options = {
    
    
     
    interaction: {
        mode: 'index' ,
        intersect: false,
      },
      stacked: false,
    scales: {
        y: {
            type: 'linear' ,
            display: true,
            position: 'left' ,
          },
          y1: {
            type: 'linear' ,
            display: true,
            position: 'right' ,
            grid: {
              drawOnChartArea: false,
            },
          },
      xAxis: {
           
        ticks: {
            font: {
                size: 18,
                family:'Times New Roman '
            }
        }
          
      }
  },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
          display: false,
        
      },
   
      title: {
        display: true,
        text: 'CALL',
        padding: {
            top: 10,
            bottom: 30
        }
  
      },
      datalabels: {
         
          color: 'black'
          }
       
    },
  } 


  var options2 = {
    
    
    elements: {
       
    },
    interaction: {
        mode: 'index' ,
        intersect: false,
      },
      stacked: false,
    scales: {
       
        y2: {
            type: 'linear' ,
            display: true,
            position: 'left' ,
          },
          y21: {
            type: 'linear' ,
            display: true,
            position: 'right' ,
            grid: {
              drawOnChartArea: false,
            },
          },
      xAxis: {
           
        ticks: {
            font: {
                size: 20,
                family:'vazir'
            }
        }
          
      }
  },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
          display: false,
        
      },
   
      title: {
        display: true,
        text: 'PUT',
        padding: {
            top: 10,
            bottom: 30
        }
  
      },
      datalabels: {
         
          color: 'black'
          }
       
    },
  }









  return (
  
    <div>
  <Chart width={window.innerWidth} height={(window.innerHeight)/2} type='bar' data={data}  options={options}/>
  <div style={{margin:"10px"}}>
    
  </div>
  <Chart width={window.innerWidth} height={(window.innerHeight)/2} type='bar' data={data2}  options={options2}/>
  
  </div>
  
  )
}





// {
//     type: 'bar' ,
//     label: 'Dataset 2',
//     backgroundColor: 'rgb(75, 192, 192)',
//     data: [101,333],
//     borderColor: 'white',
//     borderWidth: 2,
//   },
//   {
//     type: 'bar'  ,
//     label: 'Dataset 3',
//     backgroundColor: 'rgb(53, 162, 235)',
//     data: [10,333,333],
//   },