import { Result } from "antd"

const NoDataFound = ({message}: {message?: string}) => {
  return (
    <div className="flex min-h-screen items-center justify-center text-red-700 text-xl">
    <Result status="404" title={message || "No data found"} />
   </div>
  )
}

export default NoDataFound
