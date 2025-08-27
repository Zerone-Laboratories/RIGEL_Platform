"use client";

import Image from "next/image";
import Button from "../../components/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="font-literata grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="mx-auto"
          src="/logo_without_text.svg"
          alt="Rigel logo"
          width={200}
          height={200}
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-regular text-center">
          Log in to <span className="font-bold">RIGEL</span>
        </h1>
        
        {/* Login form would go here */}
        <div className="w-full max-w-md space-y-4">
          {/* Future login form elements */}
          <p className="text-center mt-8">
            Don't have an account yet?{" "}
            <Button onClick={handleRegister} className="mt-4">Register</Button>
          </p>
        </div>
      </main>
      <div className="absolute bottom-8 right-8">
        <Image
          src="/vrs_logo_without_back.svg"
          alt="VerisimilitudeAI"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}
