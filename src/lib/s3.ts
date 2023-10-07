import AWS from 'aws-sdk';

export async function uploadToS3(file: File){
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
        });

        const s3 = new AWS.S3({ 
        region: 'us-east-2',
        params:{
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
        
        } });

        const file_key = `uploads/${Date.now().toString()}${file.name.replace(' ', '-')}`

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET!,
            Key: file_key,
            Body: file,
        }

        const upload = s3.putObject(params).on('httpUploadProgress', (evt) => {
            console.log("uplaod progress", parseInt(((evt.loaded*100)/evt.total).toString()) + "%");
        }).promise();

        await upload.then((data) => {
            console.log("upload success", file_key);
        })

        return Promise.resolve({
            file_key,
            file_name: file.name,
        });
    } catch (error) {
        console.log("upload error", error);
        // return Promise.reject(error);
    }
}

export function getS3Url(file_key: string){
    // return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.amazonaws.com/${file_key}`
    const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.us-east-2.amazonaws.com/${file_key}`

    return url;
}