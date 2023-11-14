import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CachedImage } from "../../helper/image";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.strCategory)}
              className="flex items-center space-y-1"
            >
              <View
                className={
                  category.strCategory === activeCategory
                    ? "rounded-full p-[6px] bg-amber-400"
                    : "rounded-full p-[6px] bg-black/10"
                }
              >
                <CachedImage
                  uri={category.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className={"rounded-full"}
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
