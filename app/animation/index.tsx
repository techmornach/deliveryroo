import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import axios from "axios";
import { router } from "expo-router";
// const AnimatedInput = Animated.createAnimatedComponent(TextInput);

function Screen() {
  const [products, setProduct] = useState<any>([]);
  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products").then((data) => {
      setProduct(data.data);
    });
  }, []);

  return (
    <ScrollView>
      {products.map((product: any, index: any) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/animation/product/[slug]",
                  params: { slug: product.id },
                });
              }}
            >
              <Image
                source={{ uri: product.images[0] }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}
export default Screen;
