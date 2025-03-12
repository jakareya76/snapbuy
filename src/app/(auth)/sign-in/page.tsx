import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

console.log(APP_NAME);

const SignInPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.png"
              width={60}
              height={60}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{/* Form Here */}</CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
