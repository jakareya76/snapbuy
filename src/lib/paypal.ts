const base: string =
  process.env.PAYPAL_API_URL || "https://api-m.sanbox.paypal.com";

export const paypal = {};

// Generate paypal access token
async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
    "base64"
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (response.ok) {
    const jsonData = await response.json();
    return jsonData.access_token;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
