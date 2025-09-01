
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
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress))
        .orderBy(desc(MockInterview.id));

        console.log(result);
        setInterviewList(result);
    }
  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock InterviewList</h2>
         <div>
            {interviewList&& interviewList.map((interview,index)=>(
                <InterviewItemCard key={index}/>
            ))}
         </div>
    </div>
  )
}

export default InterviewList