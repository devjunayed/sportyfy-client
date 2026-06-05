import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex min-h-full min-w-full items-center justify-center bg-slate-50 p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-200 border-t-slate-950 animate-spin" />
    </div>
  );
};

export default LoadingPage;
