/* eslint-disable */



function findmisspricedpremiumfn(allcallpremiums,allputpremiums,indexofunderlying)
{


    
console.log("howojwwow"+indexofunderlying);
var index1 =0;
var temp33 =[];
for(var i= Math.floor((35/100)*allcallpremiums.length);i < Math.floor((60/100)*allcallpremiums.length); i++)
{

temp33.push(allcallpremiums[i])
       
}

const max1 = Math.max(...temp33);

allcallpremiums.forEach((element,indexc) => {

if(element == max1)
{
    
    index1 = indexc;

}

    
});




const indexz = index1;
var callmisspricedpremiumsindex =[];

for(var i=0; i< indexz ; i++)
{
    var slope =0;
    slope = allcallpremiums[i+1]-allcallpremiums[i];
    if(slope < 0)
    {
        callmisspricedpremiumsindex.push(i);

    }
    

}

for(var i=indexz; i < (allcallpremiums.length-1) ; i++)
{
    var slope =0;
    
    slope = allcallpremiums[i]-allcallpremiums[i+1];
    if(slope < 0)
    {
        callmisspricedpremiumsindex.push(i+1);

    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var max2 =0;

var index2 =0;
//var temp44 = allputpremiums.sp

var temp233 =[];
for(var i= Math.floor((35/100)*allputpremiums.length);i < Math.floor((60/100)*allputpremiums.length); i++)
{

temp233.push(allputpremiums[i])
       
}

max2 = Math.max(...temp233);

allputpremiums.forEach((element,indexc) => {

if(element == max2)
{
    
    index2 = indexc;

}

    
});


console.log("thisifde"+index2)



var putmisspricedpremiumsindex =[]; 

for(var i=0; i< index2 ; i++)
{
    var slope =0;
    slope = allputpremiums[i]-allputpremiums[i+1];
    if(slope > 0)
    {
        putmisspricedpremiumsindex.push(i+1);

    }
    

}

for(var i=index2; i < (allputpremiums.length-1) ; i++)
{
    var slope =0;
    
    slope = allputpremiums[i]-allputpremiums[i+1];
    if(slope <  0)
    {
        putmisspricedpremiumsindex.push(i+1);

    }
}



return([callmisspricedpremiumsindex,putmisspricedpremiumsindex])



}


export default findmisspricedpremiumfn ;