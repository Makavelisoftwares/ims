import Image from "next/image"

export const WelcomHeader=()=>{
    return(
        <div className="relative h-[200px] w-[200px]">
            <Image src='/vercel.svg' alt="welcome" fill className="object-contain"/>
        </div>
    )
}