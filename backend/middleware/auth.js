const jwt=require("jsonwebtoken");
module.exports=function(req,res,next){
    const token=req.header("Authorization");
    if(!token){
        return res.status(200).json({message:"Access Denied"});
    }
    try{
        const verified =jwt.verify(token,process.env.JWT);
        req.client=verified;
        next();
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}