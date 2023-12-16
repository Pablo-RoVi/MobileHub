import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Link } from "expo-router";

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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [rut, setRut] = useState("");

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleBirthYearChange = (text: string) => {
    setBirthYear(text);
  };

  const handleRutChange = (text: string) => {
    setRut(text);
  };

  const handleSubmit = () => {
    console.log("Submitted");
  }

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
      />
      <TextInput 
        style={styles.textInput} 
        label={"Nombre completo"} 
        placeholder={"Tu Nombre Completo"}
        placeholderTextColor={"#999"}
        value={name}
        onChangeText={handleNameChange}
        mode={"outlined"}
      />
      <TextInput 
        style={styles.textInput} 
        label={"Año de nacimiento"}
        placeholder={"1900 - 2023"}
        placeholderTextColor={"#999"}
        value={birthYear}
        onChangeText={handleBirthYearChange}
        mode={"outlined"}
      />
      <TextInput 
        style={styles.textInput} 
        label={"RUT"} 
        placeholder={"00.000.000-0"}
        placeholderTextColor={"#999"}
        value={rut}
        onChangeText={handleRutChange}
        mode={"outlined"}
      />
      <HelperText type="error" visible={false}>
        Credenciales inválidas
      </HelperText>
      <Link href="/home/" asChild replace={true}>
        <Button style={styles.button} mode="contained" onPress={handleSubmit}>
          Registrar
        </Button>
      </Link>
    </SafeAreaView>
  );
};

export default RegisterScreen;
