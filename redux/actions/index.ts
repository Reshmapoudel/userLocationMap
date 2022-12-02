import {
  LOCATION_ONCHANGE,
  LOCATION_ADD,
  LOCATION_DELETE,
} from "../constants/actionTypes";

export const onChangeLocation = (item) => ({ type: LOCATION_ONCHANGE, item });

export const addLocation = (item) => ({ type: LOCATION_ADD, item });

export const deleteLocation = (item) => ({ type: LOCATION_DELETE, item });
