var jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const fetchuser = async (req, res, next) => {
    //  Get the user from jwt tooken and add id to request object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({ success: false, error: "Please authenticate using a valid token"})
    }
    
    try {
        const data = jwt.verify(token, jwtSecret);
        // req.user = await User.findById(data.user.role).select("-password"); // yahan se role bhi mil jayega 
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ success: false, error: "Please authenticate using a valid token"})
    }
    
}

module.exports = fetchuser;
