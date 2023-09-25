import jwt from "jsonwebtoken";

export const verify = (req, res, next)=>{
    const token =  req.cookies.accesstoken
    if( !token ){
        res.status(401).json("no token in the request")
    }
    jwt.verify(token, process.env.secretkey, (err, user)=>{
         if(err){
            res.status(403).json("invalid token")
         }
         req.user= user
         next()
    })
}