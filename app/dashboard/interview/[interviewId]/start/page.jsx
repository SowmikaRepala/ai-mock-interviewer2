"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/public/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/public/utils/schema";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const getInterviewDetails = async () => {
      // ✅ unwrap params since it's now a Promise in Next.js 15+
      const resolvedParams = await params;
      const interviewId = resolvedParams.interviewId;

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result?.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);

        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      }
    };

    getInterviewDetails();
  }, [params]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection  mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex} 
          interviewData={interviewData}
        />
        
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0 && 
        <Button onClick={()=> setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex == mockInterviewQuestion?.length-1 && <Link href = {'/dashboard/interview/'+interviewData?.mockId+"/feedback"} > 
        <Button>End Interview</Button>
        </Link>}
      </div>
    </div>
  );
}

export default StartInterview;
