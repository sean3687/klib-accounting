const handler = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const file_id = req.query.file_id;
    
    try {
        const response = await axios.get(`https://chitchatrabbit.me/cpal/get_json_data?hashed_file_id=${file_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        res.status(200).json({
           data: response.data,
        });
    } catch (error) {
        
        res.status(500).json({
            data: "error"
        });
    }
}