import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ title = "Chatly", description = "this is a chat app" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

export default Title;
