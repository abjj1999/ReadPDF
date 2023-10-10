// let p


import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
export const getPineconeClient = async () => {
    // new Pinecone.
    const pinecone = new Pinecone({ 
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENV!,
    })

    return pinecone;
}

export async function loadS3IntoPinecone(fileKey: string){
    // get the pdf from s3 and load it into pinecone as a vector
    console.log("downloading from s3");
    const fileName = await downloadFromS3(fileKey);
    if(!fileName){
        throw new Error("cannot download file from s3");
    }
    const pdfLoader = new PDFLoader(fileName);
    const pages = await pdfLoader.load();

    console.log("loading pages");

    return pages;

}

// await pinecone.listIndexes()