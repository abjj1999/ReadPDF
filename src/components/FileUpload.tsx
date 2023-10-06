"use client"
import { Inbox } from 'lucide-react';
import {useDropzone} from 'react-dropzone'
interface FileUploadProps {}

const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
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