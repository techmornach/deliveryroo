import { Stack } from "expo-router";
import { Image, Button, View } from "react-native";
import { useState } from "react";

function LogoTitle({ props }: any) {
  return (
    <View className={"w-full flex items-center justify-center"}>
      <Image
        className={" h-8 w-8"}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
      />
    </View>
  );
}
export default function RootLayout() {
  const [count, setCount] = useState(0);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen name="animation" />
    </Stack>
  );
}
