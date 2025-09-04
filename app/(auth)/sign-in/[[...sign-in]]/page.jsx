import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className=" dark:bg-gray-900 min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full">
        <SignIn />
      </div>
    </section>
  );
}

