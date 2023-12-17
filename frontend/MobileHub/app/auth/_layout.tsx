/**
 * File: AuthLayout.js
 * Description: React Native component defining the layout for the authentication user interface.
 * This component includes an Appbar with a back button and a slot to insert other components.
 */

import React from "react";
import { Slot, router } from "expo-router";
import { Appbar } from "react-native-paper";

// Styles for the component
const styles = {
  appbar: {
    margin: 0,
  },
};

/**
 * Function: handleBack
 * Description: Handles the back action in the Appbar, using the router.
 */
const handleBack = () => {
  router.back();
};

/**
 * Component: AuthLayout
 * Description: This component represents the common layout for authentication screens.
 * It includes an Appbar with a back button and a slot to insert other components.
 */
const AuthLayout = () => {
  return (
    <>
      {/* Appbar with back button */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => handleBack()} />
      </Appbar.Header>
      <Slot />
    </>
  );
};

// Export the AuthLayout component for use in other parts of the application.
export default AuthLayout;
