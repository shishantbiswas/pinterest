import { FileWarningIcon } from "lucide-react";

export default function ImageError({className}:{className:string}){
    return(
        <div className={` ${className} flex flex-col gap-2 w-full rounded-xl min-h-[200px] items-center justify-center`}> 
            <FileWarningIcon />
            <h1 className="text-xl">Image Error !</h1>
        </div>
    )
}   