/**
 * @file HomeScreen.tsx
 * @description Home screen of the application.
 * This screen allows users to view their repositories and commits.
 */
import React from "react";
import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { Link } from "expo-router";
import { useAuth } from "../context/AuthContext";

/**
 * Styles for the HomeScreen component.
 * @type {object} - CSS HomeScreen properties.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "100%",
  },
  logo: {
    width: "100%",
    height: "40%",
  },
});

/**
 * Component: HomeScreen
 * Description: Represents the home screen of the application.
 * It includes a welcome message, logo, and buttons to navigate to the login and register screens.
 */
const HomeScreen = () => {
  // Render the HomeScreen component
  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome message */}
      <Text variant="displayMedium">¡BIENVENID@!</Text>

      {/* Application logo */}
      <Image
        source={require("../assets/images/MobileHub.png")}
        style={styles.logo}
      />

      {/* Button to navigate to the login screen */}
      <Link href="/auth/login" asChild>
        <Button
          mode="contained"
          style={styles.button}
        >
          Iniciar Sesión
        </Button>
      </Link>

      {/* Button to navigate to the register screen */}
      <Link href="/auth/register" asChild>
        <Button
          mode="outlined"
          style={styles.button}
        >
          Registrarse
        </Button>
      </Link>
    </SafeAreaView>
  );
};

// Export the HomeScreen component for use in other parts of the application
export default HomeScreen;
