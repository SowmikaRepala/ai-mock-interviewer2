"use client"
import { UserAnswer } from '@/public/utils/schema'
import React,{useEffect,useState} from 'react'
import { db } from '@/public/utils/db';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
function feedback({params}) {
  const [feedbackList,setFeedbackList]=useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const router = useRouter();
  useEffect(()=>{
     GetFeedback();
  },[])
  const GetFeedback= async()=>{
    const result=await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  
  if(result.length > 0){
  const ratings = result.map(item => Number(item.rating) || 0);
  const avg = ratings.reduce((a,b) => a+b, 0) / ratings.length;
  const scaledAvg = (avg * 2).toFixed(1); // convert to scale of 10
  setOverallRating(scaledAvg);
}
  }
  return (
    <div className='p-10'> 
    
    {feedbackList?.length==0?
     <h2 className='font-bold text-xl text-gray-500'>No Interview  Feedback Record Found</h2>
    :
    <>
    <h2 className='text-2xl font-bold text-green-600'>Congratulations!</h2>
    <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
    <h2 className='text-blue-700 text-lg my-3'>Your overall interview rating : <strong>{overallRating}/10</strong></h2>
    <h2 className='ext-sm text-gray-500'>Find below interview questions with correct answer , Your feedbaack for improvement</h2>
     {feedbackList&&feedbackList.map((item,index)=>(
      <Collapsible>
     <CollapsibleTrigger className='p-2 bg-secondary rounded-lg  flex justify-between my-2 text-left gap-7 '>
     {item.question}<ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
     <CollapsibleContent>
      <div><h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
      <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.userAns}</h2>
      <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong>{item.correctAns}</h2>
      <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback:</strong>{item.feedback}</h2>
      </div>
     </CollapsibleContent>
     </Collapsible> 
     ))}
      </>}
     <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    
    </div>
    
  )
}

export default feedback