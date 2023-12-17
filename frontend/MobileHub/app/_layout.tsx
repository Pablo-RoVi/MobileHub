/**
 * File: HomeLayout.js
 * Description: React Native component representing the layout for the Home screen.
 * This layout includes the SafeAreaProvider, PaperProvider, and Slot components.
 */

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, MD3LightTheme as Theme } from "react-native-paper";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

// Define a custom theme for the PaperProvider.
const theme = {
  ...Theme,
  colors: {
    ...Theme.colors,
    primary: "#fcaf43",
    secondary: "#fcaf43",
  },
};

/**
 * Component: HomeLayout
 * Description: Represents the layout for the Home screen.
 * It includes the SafeAreaProvider, PaperProvider with a custom theme, and Slot component.
 */
const HomeLayout = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
};

// Export the HomeLayout component for use in other parts of the application.
export default HomeLayout;
