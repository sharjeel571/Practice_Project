const jwt = require('jsonwebtoken');

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY;


const fetchUser = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(200).send({ message: "can not find token" });
    }
  
    try {
      const data = jwt.verify(token, JWT_SECRETE_KEY);
      console.log("user: " + data);
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).send({ error: "Authentication failed: Token not found" });
    }
  };
  
  module.exports = fetchUser;
  

module.exports = fetchUser;