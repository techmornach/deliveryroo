import { useLocalSearchParams } from "expo-router";

import { useEffect, useState } from "react";
import axios from "axios";
import { Text, ScrollView } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  LightSpeedInLeft,
} from "react-native-reanimated";

export default function Page() {
  const { slug } = useLocalSearchParams();

  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${slug}`)
      .then((data) => {
        setProduct(data.data);
      });
  }, []);
  if (product) {
    return (
      <ScrollView>
        <Animated.Text
          entering={FadeInLeft.duration(500).delay(400)}
          exiting={FadeInRight.duration(300)}
          style={{ fontWeight: "bold", fontSize: 18, padding: 16 }}
        >
          {product.title}
        </Animated.Text>
        <Animated.Text
          entering={LightSpeedInLeft.duration(600).delay(400)}
          style={{ fontSize: 18, padding: 16 }}
        >
          {product.description}
        </Animated.Text>
      </ScrollView>
    );
  }
}
