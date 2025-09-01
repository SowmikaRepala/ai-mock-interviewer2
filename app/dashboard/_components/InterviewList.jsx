
"use client";
import React from 'react'
import { useUser } from '@clerk/nextjs';
import { MockInterview } from '@/public/utils/schema';
import { desc,eq } from 'drizzle-orm';
import { db } from '@/public/utils/db';
import { useState,useEffect } from 'react';
import InterviewItemCard from './InterviewItemCard';
function InterviewList() {
   
    const {user} = useUser();
    const [interviewList,setInterviewList]=useState([]);
     useEffect(()=>{
       user && GetInterviewList();
    },[user])
    const GetInterviewList= async()=>{
        const email = user?.primaryEmailAddress?.emailAddress
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,email))
        .orderBy(desc(MockInterview.id));
        
       
        console.log(result);
        setInterviewList(result);
    }
    console.log("InterviewList:", interviewList);
  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock InterviewList</h2>
       
         <div className='grid grid-cols-1 md:grid-cols lg:grid-cols-2 gap-5 my-3'>
          {interviewList && interviewList.map((interview)=>(
           <InterviewItemCard 
            key={interview.id}
           interview={interview}
          /> 

         ))}
         
         
        
   </div>
    </div>
  )
}

export default InterviewList