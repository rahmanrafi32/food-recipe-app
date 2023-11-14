import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import logo from "../../../assets/images/welcome.png";

export default function WelcomeScreen() {
  const outerRing = useSharedValue(0);
  const innerRing = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    outerRing.value = 0;
    innerRing.value = 0;
    setTimeout(
      () => (outerRing.value = withSpring(outerRing.value+ hp(5))),
      100
    );
    setTimeout(
      () => (innerRing.value = withSpring(innerRing.value+ hp(5.5))),
      300
    );

    setTimeout(
        () => navigation.navigate("Home"),
        2500
      );
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      <View className="bg-white/20 rounded-full" style={{ padding: hp(5) }}>
        <View className="bg-white/20 rounded-full" style={{ padding: hp(4.5) }}>
          <Image source={logo} style={{ width: 200, height: 200 }} />
        </View>
      </View>
      <View className="flex items-center space-y-2">
        <Text
          className=" font-bold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white tracking-widest"
          style={{ fontSize: hp(4.5) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}