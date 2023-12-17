/**
 * File: Navbar.js
 * Description: React component representing the navigation bar.
 * It includes an Appbar with a menu and options to navigate within the application.
 */

import React, { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";

// List of menu options
const options = ["Editar perfil", "Cerrar sesión"];

// Styles for the component
const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: Colors.primaryOrange,
  },
  menu: {
    marginTop: 84,
  },
});

/**
 * Component: Navbar
 * Description: Represents the navigation bar with an Appbar and a menu.
 * It provides options to navigate within the application.
 */
const Navbar = () => {
  // State to manage menu visibility
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useAuth();

  // Function to open the menu
  const openMenu = () => setMenuVisible(true);

  // Function to close the menu
  const closeMenu = () => setMenuVisible(false);

  // Function to handle option press and return the corresponding route
  const handleOptionPress = (option: string) => {
    if (option === "Cerrar sesión") return logout();
    return "/";
  };

  // Function to return the corresponding route for an option
  const optionHref = (option: string) => {
    if (option === "Editar perfil") return "/home/editprofile";
    return "/";
  };

  // Render the Navbar component
  return (
    <>
      {/* Appbar with title and menu icon */}
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Action
          icon="menu"
          onPress={openMenu}
          iconColor={Colors.white}
        />
        <Appbar.Content
          title="¡Bienvenid@ a MobileHub!"
          titleStyle={{ color: Colors.white }}
        />
      </Appbar.Header>

      {/* Menu component with dynamic options */}
      <Menu
        style={{ ...styles.menu }}
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={{ x: 0, y: 0 }}
      >
        {/* Map through options to create Menu.Items with links */}
        {options.map((option) => (
          <Link key={option} href={optionHref(option)} asChild>
            <Menu.Item
              onPress={() => {
                handleOptionPress(option);
              }}
              title={option}
              titleStyle={{ color: Colors.primaryOrange }}
            />
          </Link>
        ))}
      </Menu>
    </>
  );
};

// Export the Navbar component for use in other parts of the application
export default Navbar;
