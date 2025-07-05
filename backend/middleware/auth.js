const jwt = require('jsonwebtoken');

// req.user is a string (first parse it to JSON)
const authenticate = (req, res, next) => {

  let token = req.headers.authorization;
  let userData = req.headers.user_data;

  console.log(userData);
  // console.log("hello");
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if(req.method == 'GET'){
      // req.user = userData;
    // }else if (req.method == 'POST') {
    req.user = JSON.parse(userData);
    // }
    // console.log(userData);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = { authenticate };


