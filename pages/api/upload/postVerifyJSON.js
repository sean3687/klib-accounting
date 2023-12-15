import axios from "axios";

export default async function handler(req, res){
    const token = req.headers.authorization.split(" ")[1];
    const formdata = req.body.data;
    console.log("this is form data 22",formdata)
    
    try {
        const response = await axios.post(`https://chitchatrabbit.me/cpal/verify_json_data`, formdata,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
           
        });
        res.status(200).json({
            detail : "successfully updated"
        });
    } catch (error) {
        
        res.status(500).json({
            detail: error.message
        });
    }
}