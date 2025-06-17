import { Car, Eye } from "lucide-react";

type LoginFormProps = {
  onSwitch: () => void;
};

export const LoginForm = ({ onSwitch }: LoginFormProps) => {
  return (
    <div className="container max-w-md">
      <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-[#0c336a] rounded-md p-2">
              <Car size={32} color="#fff" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-muted-foreground text-[#65758b]">
            Sign in to your CarVoyance account
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your email"
                  className="flex h-10 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                />
              </div>
              <button
                type="button"
                className="absolute right-3 top-[38px] transform"
                aria-label="Show password"
              >
                <Eye size={20} />
              </button>
            </div>
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#0c336a] text-white hover:bg-primary-light h-10 px-4 py-2 w-full">
            <span>Sign In</span>
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSwitch}
              type="button"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <a
            className="text-sm text-[#0c336a] hover:underline"
            href="/forgot-password"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};
