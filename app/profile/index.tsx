import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-yellow-200">
      <Text>Open up App.js to start working on your app!, this is profile</Text>
      <Link
        href={"/settings"}
        className=" underline text-green-400 text-[40px]"
      >
        settings
      </Link>
    </View>
  );
}
