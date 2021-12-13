import { StatusBar } from "expo-status-bar";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import themes from "./styles/theme";
import { View, StyleSheet, useColorScheme } from "react-native";

const Drawer = createDrawerNavigator();

const App = () => {
  const scheme = useColorScheme();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...themes[scheme].colors
    }
  };

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={({ navigation }) => {
            return (
              <View style={styles.container}>
                <StatusBar style={scheme === "dark" ? "light" : "dark"} />
              </View>
            );
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
