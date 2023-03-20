const aws= require("aws-sdk");
const {ACCESS_KEY_ID, SECRET_ACCES_KEY, C_SECRET_ACCES_KEY, C_ACCESS_KEY_ID} = require('../config/keys');

const cloudinary = require('cloudinary');

// cloudinary Configuration 
cloudinary.v2.config({ 
    cloud_name: "dibrhyurs", 
    api_key: C_ACCESS_KEY_ID, 
    api_secret: C_SECRET_ACCES_KEY,
    secure: true
  });


aws.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCES_KEY,
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read", // access control lists (ACLs) enable you to manage access to buckets and objects
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}



module.exports = {uploadFile, cloudinary};