import Image from "next/image"

export const Logo=()=>{
    return(
        <div className="mb-1 flex relative h-[50px] w-[50px] items-center justify-center">
            <Image src='/vercel.svg' alt="logo" fill className="object-contain"/>
        </div>
    )
}