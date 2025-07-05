// const userModel = require('../models/userModel')

// const crypto = require("crypto")
// const jwt = require('jsonwebtoken');
// const axios = require('axios');

// function comparePassword(password, storedSalt, storedHash) {
//     const hash = crypto.createHmac('sha256', storedSalt).update(password).digest('hex');
//     return hash === storedHash;
// }

// const verifyRecaptcha = async (token) => {
//     const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
//       params: {
//         secret: "6Lcd4sIqAAAAAO2UJeHr1t5om4f8nd-lkD_zfR9v",
//         response: token,
//       },
//     });
  
//     return response.data.success;
// };

// // Authenticate user
// const authenticateUser = (async (req, res) => {
//     const { email, password, recaptcha_token } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ code: '4040', msg: 'Please fill in all required fields' });
//     }
    
//     if (!/^[\w-]+(\.[\w-]+)*@(students|research)\.iiit\.ac\.in$/.test(email)) {
//         return res.status(400).json({ code: '4042', msg: 'Invalid IIIT email address' });
//     }

//     if(!verifyRecaptcha(recaptcha_token)) {
//         return res.status(400).json({code: '4043', msg: "Google didn't verify!"});
//     } 

//     try {
//         let user = await userModel.findOne({ email: email });
//         if (user) {
//             if(comparePassword(password, user.salt, user.password)) {
//                 const payload = {
//                     user: {
//                         id: user._id,
//                         email: user.email
//                     }
//                 };
        
//                 jwt.sign(
//                     payload,
//                     process.env.JWT_SECRET,
//                     { expiresIn: '24h' },
//                     (err, token) => {
//                         if (err) throw err;
//                         // console.log("success");
//                         res.status(200).json({ user: user, token: token });
//                     }
//                 );
//             }else {
//                 return res.status(400).json({ code: '4003', msg: 'Incorrect Password!' });
//             }
//         }else {
//             return res.status(400).json({ code: '4002', msg: 'User not found!' });
//         }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = {
//     authenticateUser,
// };


// // const token = req.header('Authorization').split(' ')[1];

// // try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     console.log('Decoded Payload:', decoded);
// // } catch (err) {
// //     console.error('Invalid Token:', err.message);
// //     res.status(401).json({ msg: 'Unauthorized' });
// // }


const userModel = require('../models/userModel')
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const axios = require('axios');
const xml2js = require('xml2js');

function comparePassword(password, storedSalt, storedHash) {
    const hash = crypto.createHmac('sha256', storedSalt).update(password).digest('hex');
    return hash === storedHash;
}

const verifyRecaptcha = async (token) => {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: "6Lcd4sIqAAAAAO2UJeHr1t5om4f8nd-lkD_zfR9v",
        response: token,
      },
    });
  
    return response.data.success;
};

// Regular email/password authentication
const authenticateUser = async (req, res) => {
    const { email, password, recaptcha_token } = req.body;

    if (!email || !password) {
        return res.status(400).json({ code: '4040', msg: 'Please fill in all required fields' });
    }
    
    if (!/^[\w-]+(\.[\w-]+)*@(students|research)\.iiit\.ac\.in$/.test(email)) {
        return res.status(400).json({ code: '4042', msg: 'Invalid IIIT email address' });
    }

    if(!verifyRecaptcha(recaptcha_token)) {
        return res.status(400).json({code: '4043', msg: "Google didn't verify!"});
    } 

    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            if(comparePassword(password, user.salt, user.password)) {
                const payload = {
                    user: {
                        id: user._id,
                        email: user.email
                    }
                };
        
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({ user: user, token: token });
                    }
                );
            } else {
                return res.status(400).json({ code: '4003', msg: 'Incorrect Password!' });
            }
        } else {
            return res.status(400).json({ code: '4002', msg: 'User not found!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const handleCASCallback = async (req, res) => {
    const { ticket } = req.query;
    
    if (!ticket) {
        return res.status(400).json({ code: '4044', msg: 'No CAS ticket provided' });
    }

    try {
        // Verify the CAS ticket with IIIT's CAS server
        const validateUrl = 'https://login.iiit.ac.in/cas/serviceValidate';
        const serviceUrl = 'http://localhost:4000/login/api/auth/cas/callback';
        
        const response = await axios.get(validateUrl, {
            params: {
                ticket: ticket,
                service: serviceUrl
            }
        });

        // Parse XML response
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(response.data);

        if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
            const casUser = result['cas:serviceResponse']['cas:authenticationSuccess']['cas:user'];
            
            // Find or create user in database
            let user = await userModel.findOne({ email: casUser });
            
            if (!user) {
                return res.status(200).json({code: "404", msg: "error: user not found!"});
            }

            // Generate JWT token
            const payload = {
                user: {
                    id: user._id,
                    email: user.email
                }
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            
            // Instead of sending JSON response, redirect to frontend with token and user ID
            const userData = encodeURIComponent(JSON.stringify(user));
            
            // Redirect to frontend with token and user data
            res.redirect(`http://localhost:3000/login?token=${token}&user=${userData}`);
        } else {
            return res.status(401).json({ code: '4045', msg: 'CAS Authentication failed' });
        }
    } catch (err) {
        console.error('CAS Authentication Error:', err);
        res.status(500).json({ code: '5000', msg: 'Server error during CAS authentication' });
    }
};


module.exports = {
    authenticateUser,
    handleCASCallback
};