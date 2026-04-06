const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const userExists=await user.findOne({email});

        if(userExists){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }

        const user=await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success:true,
            user
        });
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }
}
module.exports = {  registerUser};