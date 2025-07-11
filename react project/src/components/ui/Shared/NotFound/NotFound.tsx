import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <>
            <Link to="/">
              <Button type="primary" style={{ backgroundColor: "#1B1F3B" }}>Go to Home</Button>
            </Link>
            <Link to="/login">
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
