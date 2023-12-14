import axios from "axios";

export default async function handler(req, res) {
  const { item_id } = req.query; 
  const token = req.headers.authorization.split(" ")[1];
  console.log("This is item_id", item_id)

  const url = `https://chitchatrabbit.me/cpal/auto_fill_status?hashed_file_id=${item_id}`;

  try {
    const response = await axios.get(url, { 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const extractStatus = response.data.auto_fill_status; 

    res.status(200).json({ status: extractStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
