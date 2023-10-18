# PDF AI

## Description
An app that allows user to upload a PDF file and the user can ask questions about the PDF file and the app will answer the questions using chatgpt. 

## Process of events

1. User uploads a PDF file 
2. PDF is uploaded to AWS S3
3. PDF is retrieved from AWS S3 to be sent to BE
4. PDF is sent to BE
5. BE converts PDF to text (next need to vectorize the text)
6. embed the text using openai-edge (embeddings is the process of converting text to numbers)
7. embeded vectors are sent to Pinecone (vector database)


## Tech Stack
- Next.js13
- TailwindCSS
- AWS S3
- Drizzle-ORM
- Pinecone
- OpenAI-Edge
- OpenAI
- Clerk
- Shadcn UI

## what's next for the project
- Add a payment processor, with subscription model
    - Stripe (where users have to subscribe to use the app)
- refactor the code 
- style the app better

## live demo
https://read-pdf-4epw.vercel.app/