const router = require("express").Router();
const req = require("express/lib/request");
const course = require("../models/course");
const Course = require("../models/course")

router.post("/", async (req,res)=>{
    try{
        const course = await new Course({
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
            description: req.body.description,
            price: req.body.price
        })

        const result = await course.save();

        console.log(result)
        res.status(201).json({created: true})
    }catch(err){
        res.status(500).json({error: err})
    }
})


router.get("/", async(req,res)=>{
        const pageNumber = 1;
        const pageSize = 10;
        const courses = await Course.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        res.json({success: true,data: courses})
})

router.get("/:id", async (req,res)=>{
    const course = await Course.findById({_id: req.params.id})
    if(!course) return;
    res.status(200).json({success: true, data: course})
})

router.put("/:id",async (req,res)=>{
   const course =  await Course.findByIdAndUpdate({_id: req.params.id}, {
       $set: {
           name: req.body.name,
           author: req.body.author,
           price: req.body.price,
           tags: req.body.tags,
           isPublished: req.body.isPublished,
           description: req.body.description
       }
    }, {new: true});
   if(!course) return;
   res.json({edited: true})
})


router.delete("/:id", async (req,res)=>{
   const course = await Course.findByIdAndDelete({_id: req.params.id})
    if(course){
        res.json({delete: true})
    }else{
        res.json({delete: false})
    }
})



module.exports = router