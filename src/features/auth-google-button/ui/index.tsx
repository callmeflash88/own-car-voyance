import { Button } from "@/shared/ui";
import googleIcon from "../../../../public/assets/icons/google.svg";

export const AuthGoogleButton = () => {
  return (
    <>
      <Button
        className="mb-5 mt-2 w-[335px] lg:w-[500px] gap-3 rounded-full border border-[#B4BAC3] bg-white-base px-3.5 py-2 text-lg text-gray-dark"
        onClick={() => console.log("Sign in with Google")}
        type="button"
        // isDisabled={isLoginLoading || isRegisterLoading}
      >
        <img src={googleIcon} alt="Google" />
        <span>
          {/* {isRegistration ? "Sign up with Google" : "Sign in with Google"} */}
        </span>
      </Button>
    </>
  );
};
