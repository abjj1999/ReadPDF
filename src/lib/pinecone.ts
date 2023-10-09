// let p


import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
    // new Pinecone.
    const pinecone = new Pinecone({ 
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENV!,
    })

    return pinecone;
}

export async function loadS3IntoPinecone(fileKey: string){
    
}

// await pinecone.listIndexes()