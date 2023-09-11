import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Come back</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Notfound;
