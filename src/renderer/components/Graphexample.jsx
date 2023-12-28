/* eslint-disable */
import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
 
 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 


export default function Graphexample(dataf) {

    const labels = [''];
    var conclusion = 0;
         
          if(dataf.putorcall == "P")
          {
            conclusion =0;
              
          }
          if(dataf.putorcall == "C")
          {
            conclusion =1;
            
          }


          var options = {
            indexAxis: 'y' ,
            
            elements: {
              bar: {
                borderWidth: 2,
                   
              
                 
              },
            },
            scales: {
               
              yAxis: {
                  display: false,

                   
              },
              xAxis: {
                  display: false,
                  reverse : conclusion
                  
              }
          },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                  display: false,
                
              },
           
              title: {
                display: false,
          
              },
              datalabels: {
                 
                  color: 'black'
                  }
               
            },
          } 
          


    const data = {
     labels,
     datasets: [
       {
        barThickness: 20,
         data: labels.map(() => dataf.datad[0]),
         borderColor: 'rgb(53, 162, 235)',
         backgroundColor: 'rgba(53, 162, 235, 0.5)',
          
             },
       {
        barThickness: 20,
         data: labels.map(() => dataf.datad[1]),
         borderColor: 'rgba(200, 78, 78, 1)',
         backgroundColor: 'rgba(200, 78, 78, 1)',
       },
       {
        barThickness: 20,
           data: labels.map(() => Math.abs(dataf.datad[2])),
           borderColor: (dataf.datad[2] > 0)? '#5cb25d' : "#C71585" ,
           backgroundColor: (dataf.datad[2] > 0)? '#02ec88' : "#FF1493"
         }
     ],
   }



  return <Bar options={options} plugins={[ChartDataLabels]} data={data}  />;
}
