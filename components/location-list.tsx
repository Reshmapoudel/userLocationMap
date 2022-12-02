import React from "react";

function LocationList(props) {
  const { data, deleteLocation } = props;

  return (
    <>
      {data.map((item, index) => (
        <p key={index}>
          {item.value.name} {item.value.type}
          <button onClick={() => deleteLocation(item)}>DELETE</button>
        </p>
      ))}
    </>
  );
}

export default LocationList;
