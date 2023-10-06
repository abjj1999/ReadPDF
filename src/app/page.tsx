import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { DonutIcon, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const {userId} = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center ">
            <h1 className="flex items-center mr-3 my-2 text-4xl font-semibold text-white">
              PDF.AI 
              <DonutIcon className="w-8 h-8 ml-2 text-gray-300" />
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth &&(
              <Button className="bg-gray-600">Go to Chats</Button>

            )}
          </div>
          <p className="text-neutral-400 max-w-xl  text-lg my-3">
            Join the PDF.AI community and expolore the power of AI. 
          </p>
          <div className="w-full mt-6">
            {isAuth ? (
              // <h1 className="text-white">File upload</h1>
              <FileUpload />
            ):(
              <Link href="/sign-in">
                <Button className="p-2 bg-gray-600 hover:bg-black">Login to get Started!!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
          {/* <FileUpload /> */}
      </div>
    </div>
    </div>
  )
}
