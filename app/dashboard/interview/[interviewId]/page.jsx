"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MockInterview } from "@/public/utils/schema";
import { db } from "@/public/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    }
  }, [params]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0]);
    } catch (err) {
      console.error("Failed to fetch interview data:", err);
    }
  };

  return (
   <div className="my-10 ">
  <h2 className="font-bold text-2xl mb-6">Let's Get Started</h2>

  {/* Grid with 2 columns */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
    
    {/* LEFT SIDE */}
    <div className="flex flex-col gap-5">
      {/* Job details */}
      <div className="flex flex-col p-5 rounded-lg border gap-5">
        <h2 className="text-lg">
          <strong>Job Role/Job Position:</strong>{" "}
          {interviewData?.jobPosition || "Loading..."}
        </h2>
        <h2 className="text-lg">
          <strong>Job Description/Techstack:</strong>{" "}
          {interviewData?.jobDesc || "Loading..."}
        </h2>
        <h2 className="text-lg">
          <strong>Years Of Experience:</strong>{" "}
          {interviewData?.jobExperience || "Loading..."}
        </h2>
      </div>

      {/* Info */}
      <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
        <h2 className="flex gap-2 items-center text-yellow-500">
          <Lightbulb />
          <strong>Information</strong>
        </h2>
        <h2 className="mt-3 text-yellow-500">
          {process.env.NEXT_PUBLIC_INFORMATION ||
            "Enable video and mic to start."}
        </h2>
      </div>
    </div>

    {/* RIGHT SIDE (Webcam) */}
    <div className="flex flex-col  justify-center">
      {typeof window !== "undefined" && webCamEnabled ? (
        <Webcam
          onUserMedia={() => setWebCamEnabled(true)}
          onUserMediaError={() => setWebCamEnabled(false)}
          mirrored={true}
          style={{ height: 400, width: 400 }}
        />
      ) : (
        <>
          <WebcamIcon className="h-70 w-full my-7 p-20 bg-secondary rounded-lg border" />
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setWebCamEnabled(true)}
          >
            Enable webcam and Microphone
          </Button>
        </>
      )}
    <div className="flex justify-end  items-end">
      <Link href={'/dashboard/interview/'+params.interviewId+'/start'}></Link>
     <Button>Start Interview</Button>
    </div>
    </div>
    
    
  </div>
  
</div>

  );
}

export default Interview; 