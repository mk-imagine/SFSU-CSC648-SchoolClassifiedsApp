const S3 = require('aws-sdk')
const fs = require('fs')

//creat S3 object
const s3 = new S3({
    region: "us-east-1",
    accessKeyId: "AKIA2JSQG5HH76ZUX4PE",
    secretAccessKey: "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"
})

//upload file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: "csc648-t8-user-uploaded-images",
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

//get file from S3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: "csc648-t8-user-uploaded-images"
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream