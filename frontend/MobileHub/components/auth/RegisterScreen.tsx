/**
 * @file RegisterScreen.tsx
 * @description Register screen of the application.
 * This screen allows users to register by entering their email and password.
 */
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import RegularExpressions from "../../constants/RegularExpressions";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

/**
 * Styles for the RegisterScreen component.
 * @type {object} - CSS RegisterScreen properties.
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
 * Functional component representing the register screen.
 * @returns The LoginScreen component
 */
const RegisterScreen = () => {
  // Local states for email, password, password visibility, and login error handling.
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [rut, setRut] = useState<string>("");
  const { login } = useAuth();

  // Error handling
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [birthYearError, setBirthYearError] = useState<boolean>(false);
  const [rutError, setRutError] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<boolean>(false);

  /**
   * Change handler for the email field.
   * @param text - Text from the email field.
   */
  const handleEmailChange = (text: string) => {
    if (!RegularExpressions.emailRegex.test(text)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(text);
  };

  /**
   * Change handler for the name field.
   * @param text - Text from the name field.
   */
  const handleNameChange = (text: string) => {
    if (!RegularExpressions.nameRegex.test(text)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(text);
  };

  /**
   * Change handler for the birth year field.
   * @param text - Text from the birth year field.
   */
  const handleBirthYearChange = (text: string) => {
    if (!RegularExpressions.birthYearRegex.test(text)) {
      setBirthYearError(true);
    } else {
      setBirthYearError(false);
    }

    const currentYear = new Date().getFullYear();

    const yearValue = parseInt(text, 10);
    if (isNaN(yearValue) || yearValue > currentYear || yearValue < 1900) {
      setBirthYearError(true);
    } else {
      setBirthYearError(false);
    }

    setBirthYear(text);
  };

  /**
   * Change handler for the rut field.
   * @param text - Text from the rut field.
   */
  const handleRutChange = (text: string) => {
    if (!RegularExpressions.rutRegex.test(text)) {
      setRutError(true);
    } else {
      setRutError(false);
    }
    setRut(text);
  };

  /**
   * Form submission handler for the login form.
   * @returns The LoginScreen component if the form is invalid.
   */
  const handleSubmit = () => {
    if (emailError || nameError || birthYearError || rutError) {
      return;
    }
    sendData(email, name, birthYear, rut);
  };

  /**
   * Send register data to the server.
   * @param email The user email
   * @param fullName The user full name
   * @param birthYear The user birth year
   * @param rut The user rut
   */
  const sendData = (
    email: string,
    fullName: string,
    birthYear: string,
    rut: string
  ) => {
    const data = {
      email: email,
      rut: rut,
      birthYear: birthYear,
      fullName: fullName,
    };

    axios
      .post(`${Endpoints.urlAuth}/register`, data)
      .then((response) => {
        setRegisterError(false);
        login(response.data);
        router.push("/home/");
      })
      .catch((error) => {
        setRegisterError(true);
      })
      .finally(() => {});
  };

  /**
   * Render the register screen component.
   */
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">Registrarse</Text>
      <TextInput
        style={styles.textInput}
        label={"Correo electrónico"}
        placeholder={"tu.correo@ucn.cl"}
        placeholderTextColor={"#999"}
        autoComplete={"email"}
        value={email}
        onChangeText={handleEmailChange}
        mode={"outlined"}
        error={emailError}
      />
      <TextInput
        style={styles.textInput}
        label={"Nombre completo"}
        placeholder={"Tu Nombre Completo"}
        placeholderTextColor={"#999"}
        value={name}
        onChangeText={handleNameChange}
        mode={"outlined"}
        error={nameError}
      />
      <TextInput
        style={styles.textInput}
        label={"Año de nacimiento"}
        placeholder={"1900 - 2023"}
        placeholderTextColor={"#999"}
        value={birthYear}
        onChangeText={handleBirthYearChange}
        mode={"outlined"}
        keyboardType="numeric"
        error={birthYearError}
      />
      <TextInput
        style={styles.textInput}
        label={"RUT"}
        placeholder={"00.000.000-0"}
        placeholderTextColor={"#999"}
        value={rut}
        onChangeText={handleRutChange}
        mode={"outlined"}
        error={rutError}
      />
      <HelperText type="error" visible={registerError}>
        Credenciales inválidas
      </HelperText>
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Registrar
      </Button>
    </SafeAreaView>
  );
};

export default RegisterScreen;
