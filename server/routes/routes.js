const app = require('express').Router();
const multer = require('multer')
const crypto = require('crypto');
const UserModel = require('../Models/Model.User');
const sharp = require('sharp');

const { AllUsers, AddUser } = require('../controllers/controller.users'); // Corrected import statement
const { Upload } = require('@aws-sdk/lib-storage');

const storage = multer.memoryStorage(); // You can use memory storage for temporarily storing the file in memory.
const upload = multer({ storage: storage });

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

//function to generate each time a different keyName
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const expiration = 60; // Set the expiration time in seconds

const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

// S3 access 
const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: BUCKET_REGION,
})

app.get('/users', AllUsers);

app.post('/add', upload.single('image'), async (req, res, next) => {

    const fileBuffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();

    // Configure the upload details to send to S3
    const fileName = generateFileName()
    const upload = new Upload({
        client: s3,
        params: {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: fileBuffer,
            ContentType: req.file.mimetype,
        }
    });
    // Send the upload to S3
    await upload.done();

    // Save the image name to the database. Any other req.body data can be saved here too but we don't need any other image data.
    const user = new UserModel({ user: req.body.name, description: req.body.description, keyName: fileName });
    await user.save();
    res.send(user)
})


const generatePresignedUr = async (key) => {
    const s3Client = new S3Client({ region: BUCKET_REGION });
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
    });

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: expiration });
        return url;
    } catch (error) {
        console.error('Error generating presigned URL', error);
        return null;
    }
}

app.get('/posts', async (req, res) => {
    const posts = await UserModel.find();

    for (let post of posts) {
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: post.keyName },{ expiresIn: expiration }))
        post.keyName = url;
    }

    res.send(posts);
})

module.exports = app;
