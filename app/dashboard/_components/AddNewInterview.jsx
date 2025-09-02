"use client";
import React, { use, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/public/utils/GeminiAimodel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/public/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import{ useUser } from '@clerk/nextjs';
import { db } from "@/public/utils/db";
import { useRouter } from "next/navigation";
import { moment } from "moment";


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const[loading,setLoading]=useState(false);
  const[jsonresponse,setJsonResponse]=useState([]);
  
  const{user} = useUser();
   const router = useRouter();
  const startinterview=()=>{
      router.push('/dashboard/interview'+interviewData?.mockId+'/start');
  }
  const onSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
    console.log(jobPosition,jobDesc,jobExperience);

    const InputPrompt = "Job position: "+jobPosition+" , Job Description:"+jobDesc+",Years of Experience : "+jobExperience+" ,Depends on Job Position,Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+", Interview question along with Answer strictly in json format";
    const result= await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = ( result.response.text()).replace('```json','').replace('```','');
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);
    
    if(MockJsonResp){
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt : new Date().toISOString(),



    }).returning({mockId:MockInterview.mockId})
     
    console.log("Inserted ID:",resp)
    if(resp){
      setOpenDialog(false);
      router.push('/dashboard/interview/'+resp[0]?.mockId)
    }
    }
    else{
      console.log("ERROR");
    }
    setLoading(false);
  }

  return (
    <div>
      {/* Button to open dialog */}
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
              <div>
                <h2 className="mb-2">
                  Add details about your job position/role, job description and years of experience
                </h2>

                <div className="mt-7 my-3" >
                  <label>Job Role/Job Position</label>
                  <Input placeholder="Ex. Full Stack Developer" required
                  onChange ={(event)=>setJobPosition(event.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label >
                    Job Description / Tech Stack (In short)
                  </label>
                  <Textarea placeholder="Ex. React,Angular,Node.Js, MySql etc" required
                  onChange={(event)=>setJobDesc(event.target.value)}/>
                </div>
                <div className="my-3">
                  <label >
                    Years of experience
                  </label>
                  <Input placeholder="Ex.5" type="number"  max="50" min="0" required
                  onChange={(event)=>setJobExperience(event.target.value)}/>
                </div>
                
    

                {/* Action buttons */}
                <div className="flex gap-5 justify-end mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                 <Button type="submit" disabled={loading} onClick={startinterview}>
                  {loading ? (
                   <>
                   <LoaderCircle className="animate-spin" />
                    Generating from AI
                   </>
                   ) : (
                   "Start Interview"
                    )}
                    </Button>

                </div>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
