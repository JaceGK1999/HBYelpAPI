const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const { zip } = event.queryStringParameters;
  console.log(process.env.YELP_API_KEY, 'yelp key');
  try {
    const resp = await fetch(`https://api.yelp.com/v3/businesses/search?location=${zip}&terms=${search}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
    const data = await resp.json();
    const json = JSON.stringify(data);
    console.log(data, 'data');
    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log('error msg here', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };
