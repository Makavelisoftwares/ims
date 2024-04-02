import { AuthCheck } from "@/lib/auth/auth-check"
import { db } from "@/lib/db/db-service"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { WelcomHeader } from "./welcome-header"

export const Welcome=async()=>{
    await AuthCheck()

    return(
        <div>
            <div className="p-3">
                <WelcomHeader/>
            </div>
        </div>
    )
}