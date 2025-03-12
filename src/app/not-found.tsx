"use client";

import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.png"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />

      <div className="p-6 rounded-lg shadow-md text-center w-1/3">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find the page!!</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
