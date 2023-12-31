import axios from "axios";

const handler = async (req, res) => {
    const { username } = req.body;
    const body = { username: username };

    console.log("this is username", username)
  
    try {
      const response = await axios.post(
        `https://chitchatrabbit.me/cpal/request_password_reset?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json({ success: true, message: "Successfully register" });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        res.status(404).json({
          success: false,
          message: "Wrong verification code",
        });
      } else if (error.response && error.response.status === 400) {
        res.status(400).json({
          success: false,
          message: "Please try again",
        });
      } else {
        res.status(500).json({ success: false, message: `Please try again` });
      }
    }
};
export default handler;
