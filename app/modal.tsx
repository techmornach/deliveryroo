import { View, Platform, Text, StyleSheet, Button } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { Image } from "react-native";
import * as Location from "expo-location";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
export default function Modal() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  async function pickImage() {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [mapLat, setMapLat] = useState(6.841776681);
  const [mapLong, setMapLong] = useState(79.869319);
  const locationData = [
    { latitude: 6.841776681, longitude: 79.869319 },
    { latitude: 6.84076664, longitude: 79.871323 },
  ];
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  if (location) {
    return (
      <View style={{ height: "100%" }}>
        {/* <Text>{text}</Text> */}

        {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
        {!isPresented && <Link href="../">Dismiss</Link>}
        {/* <Text>{Platform.OS}</Text> */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          //   provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        >
          {locationData.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={`Marker ${index + 1}`}
              description={`Weight: ${data.weight}`}
            >
              <Image
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                style={styles.markerImage}
              />
            </Marker>
          ))}
        </MapView>

        <View className={"h-[50%]"}>
          <Button title="upload image" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ height: "80%", width: "100%" }}
            />
          )}
        </View>
        {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "50%",
  },
  markerImage: {
    width: 35,
    height: 35,
  },
});

const mapStyle = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#aee2e0",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#abce83",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#769E72",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7B8758",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#EBF4A4",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#8dab68",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#5B5B3F",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ABCE83",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#A4C67D",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#9BBF72",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#EBF4A4",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#87ae79",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#7f2200",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
      {
        weight: 4.1,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#495421",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
