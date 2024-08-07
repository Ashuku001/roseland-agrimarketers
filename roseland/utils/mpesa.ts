
interface DataResponse {
    access_token: string;
    // Add other properties if necessary
  }

// ACCESS TOKEN FUNCTION - Updated to use 'axios'
export async function getAccessToken() {
    console.log(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET)
    const consumer_key = process.env.CONSUMER_KEY; // REPLACE IT WITH YOUR CONSUMER KEY
    const consumer_secret = process.env.CONSUMER_SECRET; // REPLACE IT WITH YOUR CONSUMER SECRET
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth =
      "Basic " +
      Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64");
  
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: auth,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataresponse: DataResponse = await response.json();
        console.log(dataresponse);
        const accessToken = dataresponse.access_token;
        return accessToken;
      } catch (error) {
        throw error;
      }
  }
  