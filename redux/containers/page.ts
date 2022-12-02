import { connect } from "react-redux";
import { createSelector } from "reselect";
import { compose, pure } from "recompose";
import { onChangeLocation, addLocation, deleteLocation } from "../actions";
import { selectLocationItem, selectLocationData } from "../selectors";
import Page from "../../components/page";

export default compose(
  connect(
    createSelector(
      selectLocationItem(),
      selectLocationData(),
      (item, data) => ({ item, data })
    ),
    {
      onChangeLocation,
      addLocation,
      deleteLocation,
    }
  ),
  pure
)(Page);
