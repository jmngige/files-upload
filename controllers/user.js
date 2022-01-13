const User = require('../models/user')
const ErrorResponse = require('../utils/errorHandler')
const path = require('path')

exports.createUser = async (req, res, next)=>{

    // try{
    const user = await User.create(req.body)

    res.status(201).json({
        success: true,
        user  
    })

    // }catch(err){
    //     console.log(err.message)
    // }
    
    }

exports.uploadPhoto = async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse('User with the id not found', 404))
    }

    //check if a file has been selected for upload
    if(!req.files){
        return next(new ErrorResponse('File selected for upload not found', 404))
    }
    //check for file format
    const file = req.files.file
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse('Please select an image file format for upload', 400))
    }
    //check if it's in the required size
    if(file.size > process.env.PHOTO_SIZE){
        return next(new ErrorResponse(`FIle is too large please use file less than ${process.env.PHOTO_SIZE}`, 400))
    }
    //select a unique file name
    file.name = `photo_${user.id}_${new Date().getTime()}${path.parse(file.name).ext}`

    //upload file
    file.mv(`${process.env.PHOTO_PATH}/${file.name}`, async err=>{
        if(err){
            console.log(err)
        }
    })
 
    
    const update = await User.findByIdAndUpdate(req.params.id, { photo: file.name}, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        update
    })
}

exports.uploadDocument = async (req, res, next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse('User requested not found', 404))
    }

    //check if file has been selected
    if(!req.files){
        return next(new ErrorResponse('No file has been selected for upload', 404))
    }
    //check file size
    const file = req.files.file
    if(!file.size > process.env.FILE_SIZE){
        return next(new ErrorResponse(`File is too large please use file less than ${process.env.PHOTO_SIZE}`, 400))
    }

    //check file format
    const formats = /.pdf|.docx|.docs/

    if(!formats.test(path.extname(file.name))){
        return next(new ErrorResponse(`File format not supported`, 400))
    }
    //assign unique file name to avoid duplicates and overwriting
    file.name = `docs_${user.id}_${new Date().getTime()}${path.parse(file.name).ext}`

    //store the file in the fs and database
    file.mv(`${process.env.PHOTO_PATH}/${file.name}`, async err=>{
        if(err){
            console.log("Error occured trying to upload your file")
        }
    })

    const update = await User.findByIdAndUpdate(req.params.id, { cv: file.name }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        update
    })
    
}