import React, { ReactElement, useEffect } from "react";
import { compose } from "recompose";

import LocationAdd from "./location-add";
import LocationList from "./location-list";
import dynamic from "next/dynamic";
import Map from "./Map";
import styles from "../styles/Home.module.css";
interface locationProps {
  data: Array<{}>;
}
const Location = (props) => {
  const { item, data, onChangeLocation, addLocation, deleteLocation } = props;
  console.log("PROCEE", process.env.BROWSER);
  const DEFAULT_CENTER = [38.907132, -77.036546];
  return (
    <>
      <div style={{ width: "100%", height: "100px" }}>
        <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {data.map((item) => {
                return (
                  <Marker position={[item.value.lat, item.value.lng]}>
                    <Popup>
                      {item.value.name} {item.value.type}
                    </Popup>
                  </Marker>
                );
              })}
            </>
          )}
        </Map>
      </div>
      <div style={{ marginTop: "10%" }}></div>
      <LocationAdd {...props} />
      <LocationList {...props} />
    </>
  );
};

export default compose()(Location);
