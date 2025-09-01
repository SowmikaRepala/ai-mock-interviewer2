import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side image section */}
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <img
            src="https://source.unsplash.com/600x800/?technology,login"
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side sign-in form */}
        <main className="flex items-center justify-center px-8 py-10 sm:px-16 md:px-24 lg:px-32 h-screen">
          <div className="max-w-md w-full space-y-8">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
