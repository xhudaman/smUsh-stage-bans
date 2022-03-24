import React from "react";
import { useColorScheme } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import themes from "./styles/theme";
import DefaultScreen from "./components/default";

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
        <Drawer.Screen name="Waves" component={DefaultScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
