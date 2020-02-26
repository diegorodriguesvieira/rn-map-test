import { getBoundsOfDistance } from "geolib";
import { StyleSheet, Dimensions, View, Text } from "react-native";
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

    this.state = {
      distance: 1000
    };
  }

  componentDidMount() {
    this.randomDistance();
  }

  fitToCircle = () => {
    const { distance } = this.state;

    const bounds = getBoundsOfDistance(
      { latitude: LATITUDE, longitude: LONGITUDE },
      distance
    );

    if (this.map) {
      this.map.fitToCoordinates(
        [bounds[0], bounds[1]],
        { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 } },
        true
      );
    }
  };

  randomDistance = () => {
    window.setInterval(() => {
      const distances = [
        1000,
        2000,
        3000,
        4000,
        5000,
        6000,
        7000,
        8000,
        10000,
        15000,
        20000,
        25000,
        30000,
        35000,
        40000,
        45000,
        50000
      ];
      const index = Math.floor(Math.random() * distances.length);
      this.setState({ distance: distances[index] });
      this.fitToCircle();
    }, 3000);
  };

  render() {
    const { distance } = this.state;

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
        onMapReady={() => {
          this.fitToCircle();
        }}
      >
        <>
          <Marker
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 100,
                width: 100,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>{distance} metros</Text>
            </View>
          </Marker>
          <Circle
            ref={ref => (this.circle = ref)}
            onLayout={() =>
              this.circle.setNativeProps({
                fillColor: "rgba(20, 126, 251, 0.3)"
              })
            }
            center={{ latitude: LATITUDE, longitude: LONGITUDE }}
            strokeWidth={3}
            strokeColor="#147efb"
            fillColor="rgba(20, 126, 251, 0.3)"
            zIndex={1}
            radius={distance}
          />
        </>
      </MapView>
    );
  }
}

export default App;
