/* eslint-disable */
function calculatefairvalue(putstrikecallval)
{

    console.log(putstrikecallval)
    console.log("this is inside formula :  " + putstrikecallval[4])
    //listed-premium
    //delta
    //actual-premium  
    //this-only-happens-if-strikeprice-is-inthemoney[i.e ]
    var cdelta = 0;
    var pdelta = 0;
    var clistedpremium = 0;
    var cactualpremium = 0;
    var plistedpremium = 0;
    var pactualpremium = 0;
     
    var calllpremium = Number(putstrikecallval[0]);
    var putlpremium =  Number(putstrikecallval[2]);
    var strikepricev = Number(putstrikecallval[1]);
    var currentniftyvalue = Number(putstrikecallval[3]);
    
      
    if( strikepricev < currentniftyvalue )    //this means that the calles are in-the-MONEY and puts are at-and -out the money
    {    
        console.log('strikepricev < currentniftyvalue');
        clistedpremium=calllpremium;
        cdelta = Math.floor(currentniftyvalue - strikepricev);
        cactualpremium = (clistedpremium - cdelta).toFixed(3);
        
        plistedpremium = putlpremium;
        pdelta = Math.floor(currentniftyvalue - strikepricev);
        pactualpremium = putlpremium;
        

            

    }

    if( strikepricev > currentniftyvalue )    //this means that the puts are in-the-MONEY and puts are at-and -out the money
    {
        console.log('strikepricev > currentniftyvalue');
        clistedpremium=calllpremium;
        cdelta = Math.floor(strikepricev - currentniftyvalue);
        cactualpremium = clistedpremium;
        
        plistedpremium = putlpremium;
        pdelta = Math.floor(strikepricev - currentniftyvalue);
        pactualpremium = (putlpremium - pdelta).toFixed(3);

    }



    return(

        {
            CE:{
                callactualpremium: clistedpremium ,
                zdelta: cdelta ,
                callrealpremium: cactualpremium,
                callvolume:  putstrikecallval[4]

            },
            
            PE:{
                putactualpremium: plistedpremium ,
                zdelta: pdelta ,
                putrealpremium: pactualpremium,
                putvolume: putstrikecallval[5]


            }

        }



    )



}





export default calculatefairvalue ;