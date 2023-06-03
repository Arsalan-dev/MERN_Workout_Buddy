const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth =  async(req, res, next) => {
  
    //verify authentication in the request headers
  const { authorization } = req.headers;

  if(!authorization){
    return res.status(401).json({error: 'Authorization token required'})
  }

  /* to get the token authorization is a string and it comes 
  in like 'Bearer asjdsdduwdhd'. Split it by a space and take the
  second part token. The split returns an array. */

  const token = authorization.split(' ')[1]

  //verify if the extracted token is valid. Use the jwt package
  try{
    const {_id} = jwt.verify(token, process.env.SECRET)

    /*attach the user property with the req so that all next 
    middlewear can be excecuted with user id property. It only 
    select the id form the DB */
    
    req.user = await User.findOne({_id}).select('_id')
    next()


    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})

  }
};

module.exports = requireAuth
