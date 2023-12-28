/* eslint-disable */
function convertrawjsontoarray (rawdata2,expirydateno)
{
var putstrikecall = [[]];
var uniqexpirydates = [];
var uniquestrikprices =[];
const pricebasedonexpiry = [];


uniqexpirydates = rawdata2.records.expiryDates;

console.log("allllllll the expiry" + expirydateno+"  "+uniqexpirydates[1]);
console.log( rawdata2.records);

 
for (var i=0; i<rawdata2.records.data.length; i++)
{
    if(rawdata2.records.data[i].expiryDate == uniqexpirydates[expirydateno])
    {
        pricebasedonexpiry.push(rawdata2.records.data[i]);
    }
    else
    {
       
    }
    
}

 


for(var i=0; i < pricebasedonexpiry.length; i++ )
{
   if(pricebasedonexpiry[i].CE   &&  pricebasedonexpiry[i].PE  )
   {
     var temp2 = [pricebasedonexpiry[i].CE.lastPrice , pricebasedonexpiry[i].strikePrice , pricebasedonexpiry[i].PE.lastPrice , rawdata2.records.underlyingValue ,pricebasedonexpiry[i].CE.totalTradedVolume,pricebasedonexpiry[i].PE.totalTradedVolume];
     putstrikecall.push(temp2)
   }

   if( !pricebasedonexpiry[i].CE   &&  pricebasedonexpiry[i].PE  )
   {
     var temp2 = [0 , pricebasedonexpiry[i].strikePrice , pricebasedonexpiry[i].PE.lastPrice , rawdata2.records.underlyingValue ,0,pricebasedonexpiry[i].PE.totalTradedVolume];
     putstrikecall.push(temp2)
   }

   if(pricebasedonexpiry[i].CE   &&  !pricebasedonexpiry[i].PE  )
   {
     var temp2 = [pricebasedonexpiry[i].CE.lastPrice , pricebasedonexpiry[i].strikePrice , 0 , rawdata2.records.underlyingValue ,pricebasedonexpiry[i].CE.totalTradedVolume,0];
     putstrikecall.push(temp2)
   }
   
      
  
    
}

//console.log(putstrikecall);

return(putstrikecall)
}


export default convertrawjsontoarray ;