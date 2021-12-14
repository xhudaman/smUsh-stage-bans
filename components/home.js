import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { getStages } from "../scripts/stages";

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
    card: {
      backgroundColor: "red",
      aspectRatio: 1.5,
      height: "25%",
      borderRadius: 8,
      margin: 8
    },
    cardContainer: {
      width: "100%",
      height: "60%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    counters: { height: "35%" },
    selected: {
      backgroundColor: "blue"
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <View
        style={{
          height: "100%"
        }}
      >
        <Text style={styles.header}>Starters</Text>
        <View style={styles.cardContainer}>
          {starterPicks.map(stage => (
            <Pressable
              key={stage.slug}
              onPress={() => handleCardPress(stage.slug)}
            >
              <View
                style={[
                  styles.card,
                  selectedStages.includes(stage.slug) && styles.selected
                ]}
              >
                <Text>{stage.name}</Text>
              </View>
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
              <View
                key={stage.slug}
                style={[
                  styles.card,
                  styles.counters,
                  selectedStages.includes(stage.slug) && styles.selected
                ]}
              >
                <Text>{stage.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
