import React from "react";
import { Rings } from "react-loader-spinner";

const LoadingScreen: React.FC = () => {
  return (
    <div>
      <Rings color="#fff" height={80} width={80} />
    </div>
  );
};

export default LoadingScreen;
