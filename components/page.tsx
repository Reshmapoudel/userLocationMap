import React from "react";
import { compose } from "recompose";
import Location from "./location";

const Page = (props) => {
  return <Location {...props} />;
};

export default compose()(Page);
