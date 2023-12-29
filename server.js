/* eslint-disable */
 
const express = require("express");
const axios = require("axios");
var cors = require('cors')
var mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));  
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

var app = express();
app.use(cors())
var tosend;


//////////////////////////////////////////////////////////////////////////
var data1;
var mongoDB = 'mongodb+srv://joshuau:Joshua12345@cluster0.rtcoedt.mongodb.net/?retryWrites=true&w=majority/users';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

 


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
 



const UserSchema = new mongoose.Schema({
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  const Spotlightschema = new mongoose.Schema({
    content: {
      type: String,
       
    } ,
  });

  const usermodel = mongoose.model("User", UserSchema);

  const spotlightmodel = mongoose.model("Spotlight", Spotlightschema);



 

/////////////////////////////////////////////////////////////////////////////////////////////////
 


app.get("/auth/:uname/password/:password",function(request,response,next){


           var docs 
           var tocheckuname = request.params.uname;
           var tocheckpassword = request.params.password;
           var ifauthenticated =0;
           
             
  usermodel.find({user_name: tocheckuname}, function (err, docs) {
    if (err){
        console.log(err);
        data1 = err;
    }
    else{
        
        if(docs[0])
        {
        if(docs[0].password == tocheckpassword )
        {
          ifauthenticated=1;  
        }
        else
        {
          console.log("wrong password")
          ifauthenticated = -2;
        }
      }
      else
      {
        console.log("username not registered")
        ifauthenticated = -1;
      }

    data1=docs;
    }

    response.send(String(ifauthenticated));
});



  
   
})

app.get("/spotlight",function(request,response){


 
 
  
    
  spotlightmodel.find({}, function (err, doc2) {
if (err){
console.log(err);
 
}
else{
 
}
console.log(doc2);
response.send( doc2[0].content );
});





})




 


  
// async function getcookiestring ()  {
//   const browser = await puppeteer.launch({ headless: true ,args: ['--no-sandbox', '--disable-setuid-sandbox'] }); // Launch in non-headless mode to see the browser
//   const page = await browser.newPage();

//   await page.waitForTimeout(1000);

//   // Set a common Chrome user-agent
//   const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';
//   await page.setUserAgent(userAgent);

 

//   return new Promise(async (resolve, reject) => {
//     page.on('request', async request => {
//         if (request.resourceType() === 'xhr' && request.url().includes('master-quote')) {
//             console.log('XHR Request URL:', request.url());

//             // Wait for a moment to ensure cookies are set
//             await page.waitForTimeout(6000);

//             // Get cookies from the browser context
//             const cookiesArray = await page.cookies();
//             const cookieString = cookiesArray.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
//             // console.log("goodollcookie",cookieString)  
//             await browser.close();
//             resolve(cookieString); // Resolve the Promise with the cookieString
//         }
//     });

//     try {
//       await page.setExtraHTTPHeaders({
         
//           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//           'Accept-Encoding': 'gzip, deflate, br',
//           'Accept-Language': 'en-IN,en;q=0.9',
//           'Cache-Control': 'max-age=0',
//           'Connection': 'keep-alive', 
         
//           'Sec-Fetch-Dest': 'document',
//           'Sec-Fetch-Mode': 'navigate',
//           'Sec-Fetch-Site': 'none',
//           'Sec-Fetch-User': '?1',
//           'Upgrade-Insecure-Requests': '1',
//           'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
      
//     });
//       await page.goto('https://www.nseindia.com/get-quotes', { waitUntil: 'networkidle0' });
//       console.log('Page loaded successfully');
//   } catch (error) {
//       console.error('Error loading page:', error.message);
//       await browser.close();
//       reject(null); // Reject the Promise in case of error
//   }
// });
   
  
  
// } ;

 
// var cookieStringhed = null
// async function updatecookiestring()
// {

//   cookieStringhed = await getcookiestring();
  

// }
// updatecookiestring()




// let isUpdatingCookie = false;

// async function updatecookiestringvalue() {
//   if (isUpdatingCookie) {
//     console.log('Update already in progress. Waiting...');
//     await waitForUpdateToComplete();
//     console.log('Update completed. Proceeding...');
//     return;
//   }

//   isUpdatingCookie = true;
//   try {
//     // Perform your cookie update logic here
//     console.log('Updating cookie string...');
//     await updatecookiestring(); // Mock async operation
//   } catch (error) {
//     console.error('Error updating cookie string:', error);
//   } finally {
//     isUpdatingCookie = false;
//   }
// }

// function waitForUpdateToComplete() {
//   return new Promise(resolve => {
//     const interval = setInterval(() => {
//       if (!isUpdatingCookie) {
//         clearInterval(interval);
//         resolve();
//       }
//     }, 500);
//   });
// }





// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function fetchDataWithRetry(indexs, maxRetries = 3) {
//   let attempts = 0;

//   while (attempts < maxRetries) {
//     try {


//       const headers = {
//         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//         'Accept-Encoding': 'gzip, deflate, br',
//         'Accept-Language': 'en-IN,en;q=0.9',
//         'Cache-Control': 'max-age=0',
//         'Connection': 'keep-alive',
//         'Cookie': String(cookieStringhed),
//         'Referer': 'https://www.nseindia.com/',
//         'Upgrade-Insecure-Requests': '1',
//         'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
//         'Sec-Fetch-Dest': 'document',
//         'Sec-Fetch-Mode': 'navigate',
//         'Sec-Fetch-Site': 'none',
//         'Sec-Fetch-User': '?1',
//         'Upgrade-Insecure-Requests': '1',
//         'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
//         'sec-ch-ua-mobile': '?1',
//         'sec-ch-ua-platform': '"Android"' ,
//         'Host': 'www.nseindia.com'
//        }
      

//       // const response = await axios.get(`https://www.nseindia.com/api/option-chain-indices?symbol=${indexs}`, {
//       //   headers: {
//       //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//       //     'Accept-Encoding': 'gzip, deflate, br',
//       //     'Accept-Language': 'en-IN,en;q=0.9',
//       //     'Cache-Control': 'max-age=0',
//       //     'Connection': 'keep-alive',
//       //     'Cookie': String(cookieStringhed),
//       //     'Referer': 'https://www.nseindia.com/',
//       //     'Upgrade-Insecure-Requests': '1',
//       //     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
//       //     'Sec-Fetch-Dest': 'document',
//       //     'Sec-Fetch-Mode': 'navigate',
//       //     'Sec-Fetch-Site': 'none',
//       //     'Sec-Fetch-User': '?1',
//       //     'Upgrade-Insecure-Requests': '1',
//       //     'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
//       //     'sec-ch-ua-mobile': '?1',
//       //     'sec-ch-ua-platform': '"Android"' ,
//       //     'Host': 'www.nseindia.com'
//       //    }
//       //    ,
//       //    timeout: 10000
//       // });


//       const response = await fetch(`https://www.nseindia.com/api/option-chain-indices?symbol=${indexs}`, {
//         method: 'GET',
//         headers: headers
        
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   const temp = await response.json();


//   const returnvalforfetch = {data:temp }

//   console.log(returnvalforfetch)

//       return returnvalforfetch; // Successful response
//     } catch (err) {
//       attempts++;
//       console.log(`Attempt ${attempts}: Failed to fetch data. Retrying...`);

//       if (attempts < maxRetries) {
//         await delay(1500)
//         await updatecookiestringvalue(); // Update cookie string only if retrying
//       } else {
//         console.error("Max retries reached. Returning last error.");
//         throw err; // Throw the last error after max retries
//       }
//     }
//   }
// }
 


// app.get("/:index",async function(request,response,next){

//   var indexs = request.params.index; 
//   console.log(indexs)

//   // console.log(cookieStringhed)
 

//   try {
    
     
        
//     fetchDataWithRetry(indexs).then(resp => {
      
      
        
      
//         tosend = resp.data;
      
//         response.send(tosend);
         
        
//       }).catch((err)=>{
      

//         console.log("this is error 1 ")
//          console.log(err)

//         response.send(err);
//        })
        
    
// } catch (error) {
//   console.log("this is error 2 ")
//     console.error('Error:', error);
//     response.send(error);
//     // Handle the error
// }
  
 

   
// })



let browser;
let inactivityTimeout;

async function getBrowserInstance() {
    if (browser) {
        console.log("Using existing browser instance");
        return browser;
    } else {
        console.log("Launching new browser instance");
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        return browser;
    }
}

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(async () => {
        if (browser) {
            console.log("Closing browser due to inactivity");
            await browser.close();
            browser = null;
        }
    }, 60000); // Set inactivity timeout (e.g., 60 seconds)
}


app.get("/:index",async function(request,response2,next){

  var indexs = request.params.index; 
  console.log(indexs)

  // console.log(cookieStringhed)
 

  try {
    
     
        
    const browser2 = await getBrowserInstance();
    const page = await browser2.newPage();
  
    
  
    // Set a common Chrome user-agent
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';
    await page.setUserAgent(userAgent);
  
    resetInactivityTimeout();
  
    return new Promise(async (resolve, reject) => {
      
  
      try {
        await page.setExtraHTTPHeaders({
           
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-IN,en;q=0.9',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive', 
           
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        
      });
        
        const response = await page.goto(`https://www.nseindia.com/api/option-chain-indices?symbol=${indexs}`, { waitUntil: 'domcontentloaded' });
const data = await response.json();
        console.log('Page loaded successfully');
        console.log(data)
        response2.send(data);
        
           

    } catch (error) {
        console.error('Error loading page:', error.message);
        
        reject(null); // Reject the Promise in case of error
    }
  });
        
    
} catch (error) {
  console.log("this is error 2 ")
    console.error('Error:', error);
    response2.send(error);
    // Handle the error
}
  
 

   
})

 

app.listen(4100,function() { console.log("port established");});