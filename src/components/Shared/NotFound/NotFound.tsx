import { Button, Result } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <>
            <Link href="/">
              <Button type="primary" style={{ backgroundColor: "#1B1F3B" }}>Go to Home</Button>
            </Link>
            <Link href="/login">
              <Button style={{ marginLeft: "10px", backgroundColor: "#595959", color: "white" }}>
                Login
              </Button>
            </Link>
          </>
        }
      />
    </div>
  );
};

export default NotFound;
