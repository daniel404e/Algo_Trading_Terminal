/* eslint-disable */
 
const express = require("express");
const axios = require("axios");
var cors = require('cors')
var mongoose = require('mongoose');
  
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




async function getCookiesAndSession() {
  try {
console.log("runniong")

const response = await axios.get('https://www.nseindia.com/get-quotes/derivatives?symbol=NIFTY&identifier=OPTIDXNIFTY28-12-2023CE21400.00#equity-derivative-cntrctinfo-optionchain', {
  headers: {
   
     
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-IN,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    
    'Host': 'www.nseindia.com',
  
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
}});

 

    // Log or use the cookies as needed
    const cookies = response.headers['set-cookie'];
      const cookieString = cookies.join('; ');

    // Log or use the cookies as needed
    console.log('Cookies:', cookieString);

  } catch (error) {
    console.error('Error fetching cookies:', error);
}

}

  // getCookiesAndSession();


 
//defaultLang=en; _ga=GA1.1.894073315.1703364681; nseQuoteSymbols=[{"symbol":"NIFTY","identifier":"OPTIDXNIFTY28-12-2023CE21400.00","type":"equity"}]; _ga_QJZ4447QD3=GS1.1.1703368720.2.1.1703368869.0.0.0; ak_bmsc=8A83C7D456A8AB55C5A10C880B93C709~000000000000000000000000000000~YAAQlK1NaA7CbFqMAQAAPApnmhaS4rYr7sud3+9JR4eq9xLnNOWq1vstAaW03hGvriOxN3tE0d/LrHFr4KhNFfzVc/QWYYqrQ/nWGtLmgCEmsxmmIgLMIyHz/L44XEtBvHBNNzHoLmnp8yp6hyE3LcEbbNTLIOb076g7fB5Mo4n0Idm1K7KPERcA6B+edGpXIqxDHGz8iwNISKXbiPs6TG6wmaTi8VQvXVg96oPTQDLxozizQsRQve8LDNs9dWuqBDaGIEp1A5keUBUnGRvVA1XTQid+TNRBAoRQ5JL+BBeyKDAFGuh4qOSOuiP/FvMLKi0k1GnpygDml9fIRZM2ylJDWDXO2pozQsMeM4JV7AauWQHROu/JuVxpfC1bdAOgpBGGSdwikcASusXa0UyENg==; nsit=9zyrFhFuXF2ApxY_mQYLJfYn; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwMzM5NzQ5OCwiZXhwIjoxNzAzNDA0Njk4fQ.kK90rLm4IU2g8g7rIWjyM49cl4V8xs3wSK4j39uQ8bM; AKA_A2=A; bm_mi=4B43F0152EAC54CCF86FDF950956AB99~YAAQlK1NaKjCbFqMAQAAVyBnmhYuMRAt+cGJzS4Wn0X1A9MLkgTGWCRoWdnuHWs/Pze9BojB9X7+t8KMb3aX/q/A9a7D05m9H5txKC6jw1zpOSqdZPIwkYnyepP4lFMSh/UvcBWptbbVWRcJtV9KX5kZeIzAwkdrnF7Pkk5aoa+7AfADAUQwEzIi4PeXjVgnGrRRppkv++J9zkr1sNS1f9hKCOBwaP3BZtATGNiVOIE8RBim297ywGAJuBfXIw/QrB9lPOSIDAODlQiY2Ry0FIUkeAABsiodSod9ElvhRFp6t46HWe6s7OvdmwqWzbx48zGw58css9HUdHWKwrPphkYr86Juwg==~1; bm_sv=B73E9545AFF0F1044CD5DDFDA0A65A0B~YAAQlK1NaKnCbFqMAQAAVyBnmhY7QH3JV/29pIGz2eNUfx3BhanaKb/s81wf3R7W0AlQgW3sGT+pQI5fIm1r0WF+3oNuffHnPc25XnDzNHJiWzusurHUTmrSe79Picpq409VMmT+zu6+FrX/rhBEkWXItcExCjjGXT2ug7FR7cAH+QL8h6zTBKx+2nW710xJAEMNEgXbM+Mys6Eg0wChXnysMPw4Y/jalFC9HDuNhct/3pS/HVWyOlxvlhcka+kkAUU=~1; RT="z=1&dm=nseindia.com&si=b5b600b4-82ae-46b4-9160-e9879243e3bd&ss=lqijiz1j&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d4b.akstat.io%2F&ul=jd2nd&hd=jd4cu"; _ga_87M7PJ3R97=GS1.1.1703397500.3.0.1703397500.0.0.0
//RT="z=1&dm=nseindia.com&si=b2f9a99d-a789-4ffa-96e5-222ff1e665a6&ss=lqj78cxx&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d48.akstat.io%2F"; ak_bmsc=878B026027D1C2FFE03A2A84129DC8E1~000000000000000000000000000000~YAAQlK1NaLnlblqMAQAA63TWmha2M+qoFewuI5nsxJJk0lur5lUf9zEFDQ7V3aVxWNXkoSmtcWUX6ooTlkp6Roz6AWA/8PiUCpmjDN8J2uwt8gLwzlSUM4hcZ81axjyRbEfNB9nRajyVdXG8D9qTKm/WyI1muGsqw7Mri1MGhj8i0V4oTNqFrdZtHdkj19XOcowiyyeRz4ItwdiXZtuQ6JCeM/iFKBjSmuF6WRklj+Xyt893qZgQdc7T/WRXX748/bAmyfPvD3FE6msApsHeFz03IyFddqtfCtiC9A5toGX71Cj2miYZYl08vUmmCP8lW1qdwHQCJ8n9Z89eDeN7ZwZL10JBAG27tiblzHg57iN2e7zsw/OXfyo96R59SXzMObt40YZWW/FB0OZH5Y8NiPhKgTaXqj1L7OU8awGwzhTAsI5GbU6/pYRBa3bRWyR3bQI5O5/KAav+OmH8eU/TB+3Hsz3k8eKd+jN2Onw0blkHHg2lQoF/qxNkofVgQYIMC236UfnP8iQOwQTkrFIReKR3b2RTTznoDUWp98CFiGU=; nseQuoteSymbols=[{"symbol":"NIFTY","identifier":"OPTIDXNIFTY28-12-2023CE21400.00","type":"equity"}]; _ga=GA1.1.918955560.1703404794; _ga_87M7PJ3R97=GS1.1.1703404794.1.0.1703404794.0.0.0; defaultLang=en; AKA_A2=A; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwMzQwNDc5MiwiZXhwIjoxNzAzNDExOTkyfQ.1JEuiMU3_7tVwa0I5048JAJwwHVv7C4rliByAkjNH9c; bm_sv=99EDBA3E081846C850D404F259129CF0~YAAQlK1NaL7lblqMAQAAYXXWmhYqOG7YlOGawfEmtPR8F0f/JqlES5igcMDY6Hv6G9tVQwg7ImkUjYCiilaOsip1/nLgpQyk4TlTfnWCJf0ISVbULt+I61zPnYbSPYksYXy+U8J52sWxZSJVcUOwX5anODEpOdwGximk8xilJO+OyvLt/fp93IlmrQuNd8CB9lfEgOkJ2nX2S66yZmiQkBo6uB+0Li5RYpb/oLgUEQK3TY2JVMj3VWSm9IHtlBS41JI=~1; nsit=1okJz-VoGU8qK3A3vGm3exQU
//defaultLang=en; _ga=GA1.1.894073315.1703364681; nseQuoteSymbols=[{"symbol":"NIFTY","identifier":"OPTIDXNIFTY28-12-2023CE21400.00","type":"equity"}]; nsit=9zyrFhFuXF2ApxY_mQYLJfYn; bm_mi=4B43F0152EAC54CCF86FDF950956AB99~YAAQlK1NaKjCbFqMAQAAVyBnmhYuMRAt+cGJzS4Wn0X1A9MLkgTGWCRoWdnuHWs/Pze9BojB9X7+t8KMb3aX/q/A9a7D05m9H5txKC6jw1zpOSqdZPIwkYnyepP4lFMSh/UvcBWptbbVWRcJtV9KX5kZeIzAwkdrnF7Pkk5aoa+7AfADAUQwEzIi4PeXjVgnGrRRppkv++J9zkr1sNS1f9hKCOBwaP3BZtATGNiVOIE8RBim297ywGAJuBfXIw/QrB9lPOSIDAODlQiY2Ry0FIUkeAABsiodSod9ElvhRFp6t46HWe6s7OvdmwqWzbx48zGw58css9HUdHWKwrPphkYr86Juwg==~1; ak_bmsc=F0876B8E319D756759B20E82491DC649~000000000000000000000000000000~YAAQlK1NaOfibFqMAQAAP4VtmhbsLKDP7gAGmEAKkz5c/W1GzsvXqfTgnaSL1coOpxDipmrd5G4+pcEOtA8KoyeLR/mN021pqoIVck/sBWXsVdtTqQl08+EkJjL9T05UyJQIFTVrg3c1dz4OuueyTcWfmBKkGwDY+/LVXvWXDe2dZGeZlWvNg2zSBYlZin/4vRARnslpknoEHBOhTIDt2GhOOOI4yRAKe6K/NbQ8OJ+iOwMjzgz50yoKbFe3QCw05t5UET4AEbr1vXBDSgd5AJnO1eiCp6gb1tP7zyJjgjuqGRFPK0oynPouIXWJ4MsOtwS58J8lmyo2Ql0wcAoRQQU3ylvuMTV0ZgdwvH1pRL6RIPgPcY8S5/4C9eK7vmJRqkg0bMspPpDkGDHsOlmASk/Rf0qMnLa7c6D1HamWcWGToquVvARAvuGHKfiW0zrLtUKALcltxSNRjfLcH1lvI5HCTgBbtesrhamRCRLORa5EmuwEfnE37yJhZ+ho4dkcf+n0DsOsmTTbJbZDP+AI7v5swknS/yGqRnv6pd1k4fQU4GUTNpgcXQGZoSgWNRKU0Fuq8G0=; _ga_QJZ4447QD3=GS1.1.1703400606.4.0.1703400616.0.0.0; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwMzQwMzAyNCwiZXhwIjoxNzAzNDEwMjI0fQ._f95dUG_IzNbgHCKshXpDwAKFkApAIVpYCp6IuqBKyw; AKA_A2=A; RT="z=1&dm=nseindia.com&si=b5b600b4-82ae-46b4-9160-e9879243e3bd&ss=lqj4qv81&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d41.akstat.io%2F"; bm_sv=B73E9545AFF0F1044CD5DDFDA0A65A0B~YAAQlK1NaM1pblqMAQAA/Ke7mhYqwBHw0MmGEPnVV/xnZYZqeYqrnsPd6lq868cp2pyZPdBPXmwileOfT1i4d5xtyXFMZ+r4oACYwpPZqxG063RxZNYJAiPHMaUsL9pQl3Z6blCgQ1zTgx8ZmvOehc6FhvNZ3Y+3z+qVIwiSCPcoieNlf1MT9R+gz/mUBgVY5WrU2Ptf8wLrzlUZ5D/kzrC6hf60cZrlaV/+3lJViN7rYHTSyFF5lInBctYQcB5dCiG0TQ==~1; _ga_87M7PJ3R97=GS1.1.1703400607.4.1.1703403040.0.0.0
//ak_bmsc=B40B8D918C81956B7DE82F3D4580C818~000000000000000000000000000000~YAAQlK1NaJ8Zb1qMAQAA6ETimhaAyfCT3uDO1dGlHUUAIpurW9DebXu2KWO/7ZdDYr/tL2EbEHCJQ4bLkBZgjF49VQDoNS5CaUMp9o1vxwwzqen+AklqOW61Ews4EgJn42hmUBAdV6yLpUvp0dhwOsldb7GJ8ipBr4VeT5dzFU6jRRCSJCHJpM6goN5HuFftGqBP/sqnbblw0tdyzdrUjW4c/f9YC62BX5J6I+jSdvuw+O70xAEuASAnaArSlPlvz3KRHlggBVNnw64Glq9DUzoiDJwecQbLkw/J7PSR3o3N4QjvIplFuHrnCobfSC0uE5JXt0dKKdOYuYlA48Q0t+5I872rVth6f2cSjHKGsSue1wsVYAjgtrN9G+NcsfVd6fkRi+0IcpSYvo53o2ggDwjwSLyiQ0zXGZjpxUKm4kbiy2C8GTgFHhqBTvE1hgeCvMwZRO/o7/B1vnBDMcQC9q60b7VFRsVwnjjNFVbQpF5HSwwy8IW1ypV3r19KBthTSS+sdgTzxvLVCjtgdSTNQcf5HeSatP9kmwDsVMelwMk=; nseQuoteSymbols=[{"symbol":"NIFTY","identifier":"OPTIDXNIFTY28-12-2023CE21400.00","type":"equity"}]; RT="z=1&dm=nseindia.com&si=58fdb6d2-903c-45bc-ad20-7dd419d71e05&ss=lqj7otn6&sl=1&se=8c&tt=7dl&bcn=%2F%2F684d0d41.akstat.io%2F&ld=86w"; _ga=GA1.1.624757405.1703405568; _ga_87M7PJ3R97=GS1.1.1703405568.1.0.1703405568.0.0.0; defaultLang=en; AKA_A2=A; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwMzQwNTU2MCwiZXhwIjoxNzAzNDEyNzYwfQ.zdZzIFCgupslTQlvRHAVmdyYaKjAhTdgU8_-X88Jq9U; bm_sv=B2E113E54EC132DF85E7FF9C90D3D5C2~YAAQlK1NaKQZb1qMAQAAqUXimhZ17j3U5k73yWx4eIyZq4/fDZJPswaKhlxDgSiy40qlNZ9f6J/ou5uUuCUQxyFf+z6CPmiG75KOvgwymSjdvCjfNKIzdO79fPQ92faNnf6DGarqKmsgMqPV+3xHjHq1XEKIDBrjV185/qsmHMPLI9RFGTNvLdtIaBFgUzCumB96KcWkBXcJjAnlVCdUZIzfu9/NRfr2GoRsOTILfkwmwMkTtBG76T+R4EnzQxmJYCY=~1; nsit=8DWXvL92l-q5aM0rUEqbE9jE

async function getcookiestring ()  {
  const browser = await puppeteer.launch({ headless: true ,args: ['--no-sandbox', '--disable-setuid-sandbox'] }); // Launch in non-headless mode to see the browser
  const page = await browser.newPage();

  await page.waitForTimeout(1000);

  // Set a common Chrome user-agent
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';
  await page.setUserAgent(userAgent);

 

  return new Promise(async (resolve, reject) => {
    page.on('request', async request => {
        if (request.resourceType() === 'xhr' && request.url().includes('master-quote')) {
            console.log('XHR Request URL:', request.url());

            // Wait for a moment to ensure cookies are set
            await page.waitForTimeout(6000);

            // Get cookies from the browser context
            const cookiesArray = await page.cookies();
            const cookieString = cookiesArray.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
            // console.log("goodollcookie",cookieString)  
            await browser.close();
            resolve(cookieString); // Resolve the Promise with the cookieString
        }
    });

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
      await page.goto('https://www.nseindia.com/get-quotes', { waitUntil: 'networkidle0' });
      console.log('Page loaded successfully');
  } catch (error) {
      console.error('Error loading page:', error.message);
      await browser.close();
      reject(null); // Reject the Promise in case of error
  }
});
   
  
  
} ;

 
var cookieStringhed = null
async function updatecookiestring()
{

  cookieStringhed = await getcookiestring();
  

}
updatecookiestring()




let isUpdatingCookie = false;

async function updatecookiestringvalue() {
  if (isUpdatingCookie) {
    console.log('Update already in progress. Waiting...');
    await waitForUpdateToComplete();
    console.log('Update completed. Proceeding...');
    return;
  }

  isUpdatingCookie = true;
  try {
    // Perform your cookie update logic here
    console.log('Updating cookie string...');
    await updatecookiestring(); // Mock async operation
  } catch (error) {
    console.error('Error updating cookie string:', error);
  } finally {
    isUpdatingCookie = false;
  }
}

function waitForUpdateToComplete() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (!isUpdatingCookie) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}





function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchDataWithRetry(indexs, maxRetries = 3) {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      

      const response = await axios.get(`https://www.nseindia.com/api/option-chain-indices?symbol=${indexs}`, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-IN,en;q=0.9',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Cookie': String(cookieStringhed),
          'Referer': 'https://www.nseindia.com/',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"'
         }
         ,
         timeout: 10000
      });

      return response; // Successful response
    } catch (err) {
      attempts++;
      console.log(`Attempt ${attempts}: Failed to fetch data. Retrying...`);

      if (attempts < maxRetries) {
        await delay(1500)
        await updatecookiestringvalue(); // Update cookie string only if retrying
      } else {
        console.error("Max retries reached. Returning last error.");
        throw err; // Throw the last error after max retries
      }
    }
  }
}
 


app.get("/:index",async function(request,response,next){

  var indexs = request.params.index; 
  console.log(indexs)

  // console.log(cookieStringhed)
 

  try {
    
     
        
    fetchDataWithRetry(indexs).then(resp => {
      
      
        
      
        tosend = resp.data;
      
        response.send(tosend);
         
        
      }).catch((err)=>{
      

        console.log("this is error 1 ")
         console.log(err)

        response.send(err);
       })
        
    
} catch (error) {
  console.log("this is error 2 ")
    console.error('Error:', error);
    response.send(error);
    // Handle the error
}
  
 

   
})


 

app.listen(4100,function() { console.log("port established");});