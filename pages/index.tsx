import { NextPageContext, NextComponentType } from "next";
import { compose } from "recompose";
import { connect } from "react-redux";
// import Page from "../containers/page";
import Page from "../redux/containers/page";
import { Store } from "../store";

interface IndexPageContext extends NextPageContext {
  store: Store;
}

const IndexPage: NextComponentType<IndexPageContext> = compose()(Page);

IndexPage.getInitialProps = ({ store, req }) => {
  const isServer: boolean = !!req;
  return {
    isServer,
  };
};

export default connect()(IndexPage);
