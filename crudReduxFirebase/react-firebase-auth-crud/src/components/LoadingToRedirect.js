import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(2);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/login");
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div>
    </div>
  );
};

export default LoadingToRedirect;
