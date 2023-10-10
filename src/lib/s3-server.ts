import AWS from 'aws-sdk';
import fs from 'fs';
export async function downloadFromS3(file_key: string){
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
        
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET!,
            Key: file_key,
        };

        const obj = await s3.getObject(params).promise();
        const fileName = `./tmp/pdf-${Date.now()}.pdf`;
        fs.writeFileSync(fileName, obj.Body as Buffer);
        return fileName;
    } catch (error) {
        console.log(error)
        return null;
    }
}