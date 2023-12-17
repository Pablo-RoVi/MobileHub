/**
 * @file LoginScreen.tsx
 * @description Login screen of the application.
 * This screen allows users to log in by entering their email and password.
 */
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

/**
 * Styles specific to this screen.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  textInput: {
    width: "100%",
  },
});

/**
 * Functional component representing the login screen.
 * Allows users to enter their email and password to log in.
 */
const LoginScreen = () => {
  // Local states for email, password, password visibility, and login error handling.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<boolean>(false);

  // Context method to perform the login action.
  const { login } = useAuth();

  /**
   * Change handler for the email field.
   * @param {string} text - Text from the email field.
   */
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  /**
   * Change handler for the password field.
   * @param {string} text - Text from the password field.
   */
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  /**
   * Toggle password visibility.
   */
  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  /**
   * Form submission handler for the login form.
   */
  const handleSubmit = () => {
    sendData(email, password);
  };

  /**
   * Send login data to the server.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   */
  const sendData = (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${Endpoints.urlAuth}/login`, data)
      .then((response) => {
        setLoginError(false);
        login(response.data);
        router.push("/home/");
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  /**
   * Render the login screen component.
   */
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">Iniciar Sesión</Text>
      <TextInput
        style={styles.textInput}
        label={"Correo electrónico"}
        placeholder={"tu.correo@ucn.cl"}
        placeholderTextColor={"#999"}
        autoComplete={"email"}
        value={email}
        onChangeText={handleEmailChange}
        mode={"outlined"}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={hidePassword}
        label={"Contraseña"}
        placeholder={hidePassword ? "***********" : "Tu contraseña"}
        placeholderTextColor={"#999"}
        autoComplete={"password"}
        value={password}
        onChangeText={handlePasswordChange}
        mode={"outlined"}
        right={
          <TextInput.Icon
            icon={hidePassword ? "eye" : "eye-off"}
            onPress={handleHidePassword}
          />
        }
      />
      <HelperText type="error" visible={loginError}>
        Credenciales inválidas
      </HelperText>
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Iniciar Sesión
      </Button>
    </SafeAreaView>
  );
};

// Export the component for use in other parts of the application.
export default LoginScreen;
