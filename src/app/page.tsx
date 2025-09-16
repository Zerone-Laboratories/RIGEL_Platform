"use client";

import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/login");
  };

  return (
    <div className="font-literata grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="mx-auto"
          src="/logo_without_text.svg"
          alt="Next.js logo"
          width={500}
          height={500}
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-regular text-center">
          Welcome to <span className="font-bold">RIGEL</span> API platform !
        </h1>
        <h3 className="text-yellow-500">RIGEL platform is still under contruction !</h3>
        <Button onClick={handleNavigation}> Let&apos;s get started ! </Button>
      </main>
      {/* <div className="absolute bottom-8 right-8">
        <Image
          src="/vrs_logo_without_back.svg"
          alt="VerisimilitudeAI"
          width={150}
          height={150}
          priority
        />
      </div> */}
    </div>
  );
}
