import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import avatar from "../../../assets/images/avatar.png";
import Categories from "../../components/Categories";
import Recipes from "../../components/Recipes";

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Beef");

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={avatar} style={{ width: hp(5.5), height: hp(5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Hello, Rafi!
          </Text>

          <View className="mb-4">
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food,
            </Text>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Stay at <Text className="text-amber-400">Home</Text>
            </Text>
          </View>

          <View className="flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder="Search recipe"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7) }}
              className="flex-1 text-base mb-1 pl-3 tracking-wider"
            />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon
                size={hp(2.5)}
                strokeWidth={3}
                color="gray"
              />
            </View>
          </View>
        </View>

        <View>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
