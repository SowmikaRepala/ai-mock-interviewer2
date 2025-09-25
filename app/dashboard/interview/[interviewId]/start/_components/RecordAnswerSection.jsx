
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // ✅ fix SSR issue
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Save, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/public/utils/GeminiAimodel";
import { useUser } from "@clerk/nextjs";// ✅ use correct table
import { db } from "@/public/utils/db";
import moment from "moment";
import { UserAnswer } from "@/public/utils/schema";

// ✅ dynamically import Webcam (no SSR)
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
const [userAnswer, setUserAnswer] = useState("");
const { user } = useUser();
const [loading, setLoading] = useState(false);

const {
  error,
  results,
  isRecording,
  startSpeechToText,
  stopSpeechToText,
  setResults,
} = useSpeechToText({
  continuous: true,
  useLegacyResults: false,
});


useEffect(() => {
  results.map((result)=>(
    setUserAnswer(prevAns=>prevAns+result?.transcript)
  ))
}, [results]);


useEffect(() => {
  if (!isRecording && userAnswer.length > 10) {
    console.log("Final Answer:", userAnswer);
    UpdateUserAnswer();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userAnswer]);

const StartStopRecording = () => {
  if (isRecording) {
    stopSpeechToText();
   
    
  } else {
    startSpeechToText();
  }
};

const UpdateUserAnswer = async() => {
 
  setLoading(true);
  const feedbackPrompt = "Question: " 
  + mockInterviewQuestion[activeQuestionIndex]?.question + "User Answer: " 
  + userAnswer +"Depends on question and user Answer"
  + ". Please give us a rating and feedback as area of improvement."+"Injust 3 to 5 lines to improve it in JSON format with rating and feedback fields";

   const result = await chatSession.sendMessage(feedbackPrompt);

   const mockJsonResp = (await result.response.text())
  .replace("```json", "")
  .replace("```", "");

    const JsonFeedbackResp = JSON.parse(mockJsonResp);
console.log("AI Feedback:", JsonFeedbackResp);

  

  // ✅ Save to DB with returning()
  const resp = await db.insert(UserAnswer).values({
    mockIdRef: interviewData?.mockId,
    question: mockInterviewQuestion[activeQuestionIndex]?.question,
    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
    userAns: userAnswer,
    feedback: JsonFeedbackResp?.feedback,
    rating: JsonFeedbackResp?.rating,
    userEmail: user?.primaryEmailAddress?.emailAddress || "guest@test.com",
    createdAt: moment().toDate(),
  });

  if (resp) {
    toast("User Answer recorded successfully");
     setUserAnswer('');
     setResults([]);
  }
  setResults([]);
  setLoading(false);
};
    
return (
  <div className="flex items-center justify-center flex-col">
    <div className="flex flex-col my-20 justify-center items-center bg-secondary rounded-lg p-5 relative">
      {/* Overlay icon */}
      <Image
        src="/webcam.png"
        width={200}
        height={200}
        alt="Webcam Icon"
        className="absolute opaque"
      />

      {/* Webcam feed */}
      <Webcam
        mirrored
        style={{
          height: 300,
          width: 500,
          zIndex: 10,
        }}
      />
    </div>

    {/* Record / Stop button */}
    <Button disabled={loading} variant="outline" className="my-10" onClick={StartStopRecording}>
      {isRecording ? (
        <span className="text-red-600 flex gap-2 items-center">
          <StopCircle /> Stop Recording
        </span>
      ) : (
        "🎤 Record Answer"
      )}
    </Button>

   

    {error && <p className="text-red-500 mt-2">{error.message}</p>}
  </div>
);
}

export default RecordAnswerSection;
