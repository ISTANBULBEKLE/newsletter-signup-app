const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req,res)=>{
    console.log('Server is running')
    res.sendFile(__dirname + '/signup.html');
})


app.post('/', function (req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

   const data ={
        members:[
        {
            email_address: email,
            status:'subscibed',
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]

   }



   const jsonData = JSON.stringify(data);

   const url = 'https://us2.admin.mailchimp.com/3.0/lists/15a56fcaf8';

   const options = {
    method:'POST',
    auth: 'ekip1:b352620ed9c08c7ea1a848b1f045f2f2-us2'
   };

  const request = https.request(url, options, function (response){
        response.on('data', function (data){

          /*   if (typeof data !== 'undefined') {
                 console.log(JSON.parse(data));
            }else{
                console.log('error');
            } */

            console.log(JSON.parse(data));
        });
   });

request.write(jsonData);
request.end();

});

app.listen(3000, function(){
    console.log('The server is running on port 3000.')
});



/* API Key
b352620ed9c08c7ea1a848b1f045f2f2-us2 
List Id
15a56fcaf8
*/