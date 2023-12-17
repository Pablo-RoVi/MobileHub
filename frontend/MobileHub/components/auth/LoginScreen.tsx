import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

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

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<boolean>(false);
  const { login } = useAuth();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleSubmit = () => {
    sendData(email, password);
  };

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

export default LoginScreen;
