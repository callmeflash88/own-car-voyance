import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "@/shared/assets/images/404/404.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="font-inter font-medium text-5xl leading-none tracking-normal mt-8">
        Oops! <br className="block lg:hidden" /> There’s nothing here
      </h1>
      <p className="font-inter font-medium text-xl leading-none tracking-normal mt-4">
        Go back to the{" "}
        <Link href="/" className="underline underline-offset-4">
          Home Page
        </Link>
      </p>
      <Image src={NotFoundImage} alt="404" width={700} priority />
    </div>
  );
}
