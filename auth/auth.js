import jwt from 'jsonwebtoken'
function auth(req,res,next){
    const token=req.header('auth')
    if(!token) return res.status(401).send('token Access denied')
    try {
    const decode=jwt.verify(token,process.env.JWTKEY)
    req.user=decode
    next();   
    } catch (error) {
        console.log(error.message);
        res.status(400).send('invalid token')
    }

}

export default auth

export const admin=(req,res,next)=>{
    if(!req.user.isAdmin) return res.status(403).send('Access Denide ')
    next()
}

export const cashier=(req,res,next)=>{
    if(!req.user.isCashier) return res.status(403).send('Access Denide ')
    next()
}















// import jwt from 'jsonwebtoken'

// const auth=async(req,res,next)=>{
//     const token=req.headers.token
//     // console.log(token);
//     // console.log("dskjjjdk");
//     if(!token) return res.status(401).send('Access Denide no token provide')
//     try {
//         // console.log(token);
//         const decoded=jwt.verify(token,process.env.JWTKEY);
//         req.user = decoded
//         // console.log(req.user);
//         next();
//     } catch (error) {
//         res.send("invalid token")
//     }
// }

// export default auth