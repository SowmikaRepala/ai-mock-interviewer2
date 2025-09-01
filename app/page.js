import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <h1 className="text-white text-4xl font-bold">Tailwind is Working!</h1>
      <Button>Subscribe</Button>
    </div>
   
    
  );
}

