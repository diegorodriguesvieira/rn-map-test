import { getBoundingBox } from "geolocation-utils";
import { getBoundsOfDistance } from "geolib";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { Component } from "react";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = -23.311413;
const LONGITUDE = -51.16732;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends Component {
  constructor() {
    super();

    this.circle = React.createRef();
  }

  componentDidUpdate() {
    console.log(this.circle);
  }

  render() {
    const distance = 20000;
    const bounds = getBoundsOfDistance(
      { latitude: LATITUDE, longitude: LONGITUDE },
      distance
    );

    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        ref={ref => {
          this.map = ref;
        }}
        style={{ ...StyleSheet.absoluteFill }}
        onLayout={() => {
          window.setTimeout(() => {
            this.map.fitToCoordinates([bounds[0], bounds[1]], true);
          }, 3000);
        }}
      >
        <>
          <Marker
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE
            }}
          />
          <Circle
            center={{ latitude: LATITUDE, longitude: LONGITUDE }}
            strokeWidth={3}
            strokeColor="#147efb"
            fillColor="rgba(20, 126, 251, 0.5)"
            zIndex={1}
            radius={distance}
            ref={ref => {
              this.circle = ref;
            }}
          />
        </>
      </MapView>
    );
  }
}

export default App;
