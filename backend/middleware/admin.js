module.exports=function(req,res,next){
    if(req.client.role !== "admin"){
        return res.status(403).json({message:"Access Denied"});
    }
    next();
}