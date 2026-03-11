export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-red-600">Authentication Error</h1>

      <p className="mt-4 text-gray-600">
        Something went wrong during the authentication process.
      </p>

      <a
        href="/auth/login"
        className="mt-6 text-blue-600 underline"
      >
        Go back to Login
      </a>
    </div>
  );
}
