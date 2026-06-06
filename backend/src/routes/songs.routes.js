const express=require('express');
const multer=require('multer')
const uploadFile=require('../service/storage.service')
const songModel=require('../models/songs.models')


const router=express.Router();

const upload=multer({storage:multer.memoryStorage()})

router.post('/songs',upload.single("audio"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const fileData=await uploadFile(req.file);
    console.log(fileData);
    const song=await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        mood:req.body.mood,
        audio:fileData.url
    })
    console.log(song.audio_url);
    res.status(201).json({
        message:'sucessfully create song',
        song:req.body
    })

})

router.get('/song',async(req,res)=>{
    const {mood}=req.query;
    const song=await songModel.find({
        mood:mood
    })
    res.status(200).json({
        message:'song fetched sucessfully',
        song
        
    })
})
module.exports=router;