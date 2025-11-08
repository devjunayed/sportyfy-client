/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from "antd";
import { ReactNode } from "react";
import NoDataFound from "../NoDataFound/NoDataFound";

interface THandleDataLoading {
  children: ReactNode;
  isLoading: boolean;
  data: any;
  loadingOnly?: boolean;
  noDataOnError?: boolean;
  message?: string;
}

const HandleDataLoading = ({
  children,
  isLoading,
  data,
  loadingOnly,
  noDataOnError,
  message,
}: THandleDataLoading) => {
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-700 text-xl">
        {" "}
        <Spin size="large" />
      </div>
    );
  }

  if ((data?.length === 0 || data === undefined || data === null) && noDataOnError ) {
    return <></>;
  }

  if (loadingOnly && !isLoading) {
    return children;
  }
  if (data?.length === 0 || data === undefined || data === null) {
    return <NoDataFound message={message} />;
  }

  return children;
};

export default HandleDataLoading;
