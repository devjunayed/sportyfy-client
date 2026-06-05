import Link from "next/link";
import Button from "@/components/UI/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          404 — Not Found
        </p>
        <h1 className="mt-6 text-5xl font-bold text-slate-950">
          Page not found
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Sorry, the page you visited does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/" className="w-full sm:w-auto">
            Go to Home
          </Button>
          <Button
            variant="secondary"
            href="/login"
            className="w-full sm:w-auto"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
