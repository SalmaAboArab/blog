import blogModel from "../../../../DB/model/Blog.model.js";
import usermodel from "../../../../DB/model/User.model.js";


// export const getAllblogs = async  (req, res, next) => {       //get all blogs with their owner's information  (with populate)

//     try {
//         const blogs=await blogModel.find().select("-createdAt -updatedAt").populate(
//             {
//                 path:'userId',
//                 select:'-password -createdAt -updatedAt'
//             }
//             )
//         return res.json({ message: "Done" ,blogs})
//     } catch (error) {
//         return res.json({message:"Catch Error ",error})
//     }
// }

export const getAllblogs = async  (req, res, next) => {       //get all blogs with their owner's information  (with lookup)

    try {

        // const blogs = await blogModel.aggregate([
        //     {
        //       $lookup: {
        //         from: "users",
        //         localField: "userId",
        //         foreignField: "_id",
        //         as: "owner_information",
        //       },
        //     }
        //   ])         
       
        const blogs = await blogModel.aggregate().lookup({
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "owner_information"
              })
        
        return res.json({ message: "Done" ,blogs})
    } catch (error) {
        return res.json({message:"Catch Error ",error})
    }
}


export const getblogById = async  (req, res, next) => {           //get blog by id

   try {
    const {id}=req.params;
    const blog=await blogModel.findById({_id:id}).select("-createdAt -updatedAt")
    return res.json({ message: "Done" ,blog})
   } catch (error) {
    return res.json({message:"Catch Error ",error})
   }
}


export const addblog=async (req,res,next)=>{             //add blog
   try {
    const {blogTitel,blogdescription}=req.body;
    const blog=await blogModel.create({blogTitel,blogdescription,userId:req.user.id})
    return res.json({message:"Done",blog})
   } catch (error) {
    return res.json({message:"Catch Error ",error})
   }
}

export const updateblog = async(req,res,next)=>{      //update blog (blog owner only )
    try {
        const {blogid}=req.params;
       const {blogTitel,blogdescription} = req.body;
       const blog=await blogModel.updateOne({_id:blogid , userId:req.user.id},{blogTitel:blogTitel , blogdescription:blogdescription})
       return blog.modifiedCount? res.json({ message: "Done",blog }):res.json({ message: "Invalid_ID" })
       } catch (error) {
        return res.json({message: "Catch error",error})
       }
}

export const deleteblog=async(req,res,next)=>{        //delete blog ( blog owner only)
    try {
        const {blogid}=req.params;
        const blog=await blogModel.deleteOne({_id:blogid , userId:req.user.id});
        return blog.deletedCount? res.json({ message: "Done",blog }):res.json({ message: "Invalid_ID" })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }