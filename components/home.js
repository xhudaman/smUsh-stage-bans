import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  useColorScheme
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { getStages } from "../scripts/stages";

const images = {
  fd: require("../assets/stage-images/fd.png"),
  bf: require("../assets/stage-images/bf.png"),
  sv: require("../assets/stage-images/sv.png"),
  tc: require("../assets/stage-images/tc.png"),
  ps2: require("../assets/stage-images/ps2.png"),
  ys: require("../assets/stage-images/ys.png"),
  kpl: require("../assets/stage-images/kpl.png")
};

const HomeScreen = ({ navigation }) => {
  const { starters, counters } = getStages();

  const [starterPicks] = useState(starters);
  const [counterPicks] = useState(counters);

  const [selectedStages, setSelectedStages] = useState([]);

  const scheme = useColorScheme();
  const { colors } = useTheme();

  const handleCardPress = slug => {
    if (selectedStages.length >= 4) {
      setSelectedStages([]);
      return;
    }

    if (selectedStages.includes(slug)) {
      setSelectedStages(selectedStages.filter(stage => stage !== slug));
      return;
    }

    setSelectedStages([...selectedStages, slug]);
  };

  const isSelected = slug => selectedStages.includes(slug);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    header: {
      fontSize: 26,
      color: colors.text,
      textAlign: "center",
      padding: "4%"
    },
    cardContainer: {
      width: "100%",
      height: "60%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      resizeMode: "cover"
    },
    card: {
      aspectRatio: 1.5,
      height: "25%",
      borderRadius: 8,
      margin: 8
    },
    cardTitle: { textAlign: "center", color: colors.text },
    counters: { height: "35%" },
    selected: {
      opacity: 0.4
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <View
        style={{
          height: "100%",
          paddingVertical: "5%"
        }}
      >
        <Text style={styles.header}>Starters</Text>
        <View style={styles.cardContainer}>
          {starterPicks.map(stage => (
            <Pressable
              key={stage.slug}
              onPress={() => handleCardPress(stage.slug)}
            >
              <Image
                source={images[stage.slug]}
                style={[styles.card, isSelected(stage.slug) && styles.selected]}
              />
              <Text style={styles.cardTitle}>{stage.name}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.header}>Counters</Text>
        <View style={[styles.cardContainer, { height: "40%" }]}>
          {counterPicks.map(stage => (
            <Pressable
              key={stage.slug}
              onPress={() => handleCardPress(stage.slug)}
            >
              <Image
                source={images[stage.slug]}
                style={[
                  styles.card,
                  styles.counters,
                  isSelected(stage.slug) && styles.selected
                ]}
              />
              <Text style={styles.cardTitle}>{stage.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
