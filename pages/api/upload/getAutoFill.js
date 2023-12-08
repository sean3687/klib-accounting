const handler = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const file_id = req.query.file_id;
    const file_type = req.query.type;
    console.log("this is from nextjs route"+ file_id)
    try {
        const response = await axios.get(`https://chitchatrabbit.me/cpal/auto_fill?file_type=${file_type}&hashed_file_id=${file_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log("getFileUploadStatus from api/postFileUploadStatus",response.data)
        res.status(200).json({
           data: response.data,
        });
    } catch (error) {
        
        res.status(500).json({
            data: "error"
        });
    }
}