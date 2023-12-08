const handler = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const formdata = req.body.formdata;
    
    try {
        const response = await axios.post(`https://chitchatrabbit.me/cpal/verify_receipt`, formdata,{
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
            detail: "error"
        });
    }
}