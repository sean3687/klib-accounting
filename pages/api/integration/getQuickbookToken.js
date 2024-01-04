import axios from "axios";

export default async function handler(req, res) {
    console.log("in progress api route finish1", req.body);
  const body = req.body;
 
  try {
    const response = await axios.post(
      `https://cpal-admin.com/get_token`,body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("in progress api route finish1", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log("in progress api route finish2", response.data);
    res.status(500).json({ source: "error" });
  }
}