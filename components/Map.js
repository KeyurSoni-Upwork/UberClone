import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  var mapRef = useRef(null);

  useEffect(() => {
    // console.log("Came until here, remaining to resize");

    if (!origin || !destination) return;
    // console.log("Before resieze");

    // if (mapRef != null) {
    //   console.log(Object.keys(mapRef.current.props.children));
    //   console.log(Object.values(mapRef.current.props.children));

    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["orig", "dest"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });

    // console.log("Resize Done");
    // }
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="orig"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="dest"
        />
      )}
    </MapView>
  );
};

export default Map;
