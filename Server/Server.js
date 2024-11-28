const express = require('express')
const cors = require('cors');
const axios = require('axios');
const { useParams } = require('react-router-dom');

const app = express()
const port = 3000
app.use(express.json())
//add cors
app.use(cors());

const selfClientId = "1000.4YW23XBMXY4QGNFKW4TP6REVIY02XH"
const selfClientSecret = "6b8070232c388c3f1bf85c021e9479c9ca0ff4725f"
const selfClientCode = "1000.2d0e8dfa9bfb217589d7bbe70d7b47e3.353fdfb4ba29e1403311cd0aa553471a"
const refreshToken = "1000.2cb6857a1003414c5c8d09214871cc11.76e919164717762e4ca435359f0e41ae"


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const getAccessToken = async () => {
    const response = await axios.post(`https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${selfClientId}&client_secret=${selfClientSecret}&grant_type=refresh_token`);
    // console.log(response);
    return response.data.access_token
    };



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