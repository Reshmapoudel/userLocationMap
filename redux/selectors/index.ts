import { createSelector } from "reselect";

export const selectState = () => (state) => state.location;

export const selectLocationItem = () =>
  createSelector(selectState(), (location) => location.item);

export const selectLocationData = () =>
  createSelector(selectState(), (location) => location.data);
