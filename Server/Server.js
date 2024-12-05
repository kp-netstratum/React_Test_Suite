const express = require('express')
const cors = require('cors');
const axios = require('axios');
const { useParams } = require('react-router-dom');

const app = express()
const port = 3000
app.use(express.json())
//add cors
app.use(cors());

const selfClientId = "1000.4YW23XBMXY4QGNFKW4TP6REVIY02XH";
const selfClientSecret = "6b8070232c388c3f1bf85c021e9479c9ca0ff4725f";
const selfClientCode = "1000.b0e96896034288b250a1951585ed11f5.74b665e694e693a43d8ba41a1f428888";
// const refreshToken = "1000.2cb6857a1003414c5c8d09214871cc11.76e919164717762e4ca435359f0e41ae"
// scope : ZohoCRM.modules.ALL,ZohoCRM.settings.ALL

let refreshToken = ''

const generateRefreshToken = async () => {
  // const response = await axios.post('https://accounts.zoho.com/oauth/v2/token?code=1000.625c54ea017a215a76381f3974e98951.accbc050b5e6470bcf2a4c09cbac83a5&client_id=1000.HXAFRK6L10TR4ZA95S97LQ1YPUU6NY&client_secret=edf086cb02cb7cdc4653a882b67c3126286c2d132e&redirect_uri=http://localhost:5173/zoho-crm&grant_type=authorization_code')
    const url = 'https://accounts.zoho.com/oauth/v2/token';
    const params = {
        code: selfClientCode, // Your authorization code
        client_id: selfClientId, // Your client ID
        client_secret: selfClientSecret, // Your client secret
        redirect_uri: 'http://localhost:5173/zoho-crm', // Your redirect URI
        grant_type: 'authorization_code', // Grant type for exchanging the code
    };
        const response = await axios.post(url, new URLSearchParams(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(response);
        refreshToken = response.data.refresh_token
        
}  

const getAccessToken = async () => {
    const response = await axios.post(`https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${selfClientId}&client_secret=${selfClientSecret}&grant_type=refresh_token`);
    // console.log(response);
    return response.data.access_token
    };

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getAccounts',async (req, res) => {
    const accessToken = await getAccessToken();
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      };
      fetch(`https://www.zohoapis.com/crm/v2/Testing`, options)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            res.send(response.data)
        })
        .catch(err => console.error(err));
})

app.get('/getScrubs/:id',async (req, res) => {
    const id = req.params.id
    // console.log(id);
    const accessToken = await getAccessToken();
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      };
      fetch(`https://www.zohoapis.com/crm/v2/Testing/${id}`, options)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            res.send(response.data)
        })
        .catch(err => console.error(err));
})

app.post('/addScrub/:id',async (req, res) => {
    const data = req.body.data
    const id = req.params.id
    // console.log(data);

    const raw_data = {
        "data": [
            {
                "Subform": data
                
            }
        ]
    }

    const accessToken = await getAccessToken();
    const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw_data)
      };
      fetch(`https://www.zohoapis.com/crm/v2/Testing/${id}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            res.send(response.data)
        })
        .catch(err => console.error(err.data[0].details));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))