import { db } from "@/lib/db/db-service";
import { NextResponse } from "next/server";

export const dynamic="force-dynamic"

export const POST = async (req) => {
  try {
    const {
      communication,
      skills,
      quality_of_work,
      punctuality,
      problem_solving,
      comments,
      id,
      attendance,
    } = await req.json();

    

    const report = await db.evaluation.create({
      data: {
        communication,
        commments: comments,
        attendance,
        onboardingId: id,
        punctuality,
        problem: problem_solving,
        skills,
        quality: quality_of_work,
      },
    });

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};



export const GET=async(req)=>{
  try {
    const onboardId=new URL(req.url).searchParams.get('id');

    const evaluations=await db.evaluation.findMany({
      where:{
        onboardingId:onboardId
      }
    })

    return NextResponse.json(evaluations,{status:200})
  } catch (error) {
    console.log(error)
  }
}