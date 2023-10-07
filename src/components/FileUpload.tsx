"use client"
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Inbox } from 'lucide-react';
import {useDropzone} from 'react-dropzone'
import toast from 'react-hot-toast';
interface FileUploadProps {}

const  FileUpload = () => {
    const  {mutate} = useMutation({
        mutationFn: async({file_key, file_name}:{file_key: string, file_name: string}) => {
            const res = await axios.post("/api/chat/create",{
                file_key, file_name
            })
            return res.data;
        }
    })
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            // console.log(acceptedFiles);
            const file = acceptedFiles[0];
            if(file.size > 10*1024*1024){
                // bigger than 10mb
                // alert("File size is too big");
                toast.error("File size is too big");
                return;
            }

            try {
                const data = await uploadToS3(file);
                // console.log(data);
                if(!data?.file_key|| !data?.file_name){
                    // alert("Error uploading file");
                    toast.error("Error uploading file");
                    return;
                }

                mutate(data, {
                    onSuccess:() => {
                        console.log("Success", data);
                    },
                    onError: (error) => {
                        toast.error("Error creating chat");
                    }
                });
                
            } catch (error) {
                console.log(error);
            }

        }
    });
    return ( 
        <div className="p-2 bg-white rounded-xl">
            <div {...getRootProps({
                className: 'dropzone border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
            })}>
                <input type="text" className="" {...getInputProps()} />
                <>
                    <Inbox className="w-10 h-10 text-blue-500" />
                    <p className="mt-2 text-sm text-slate-400">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                </>
            </div>
        </div>
     );
}
 
export default FileUpload;