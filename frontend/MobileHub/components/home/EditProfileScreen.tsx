import { Text } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { router } from "expo-router";
import colors from "../../constants/Colors";
import RegularExpressions from "../../constants/RegularExpressions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    alignItems: "center",
    gap: 20,
  },
  appbar: {
    margin: 0,
    backgroundColor: colors.primaryOrange,
  },
  textInput: {
    width: "100%",
  },
});

const EditProfile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [hidePassword, sethidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [editOption, setEditOption] = useState<boolean>(true);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [birthYearError, setBirthYearError] = useState<boolean>(false);

  const handleEmailChange = (text: string) => {
    if (!RegularExpressions.emailRegex.test(text)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(text);
  };

  const handleNameChange = (text: string) => {
    if (!RegularExpressions.nameRegex.test(text)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(text);
  };

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

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
  };

  const handleHidePassword = () => {
    sethidePassword(!hidePassword);
  };

  const handleHideNewPassword = () => {
    setHideNewPassword(!hideNewPassword);
  };

  const optionsButtons = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          mode="contained"
          onPress={() => setEditOption(true)}
          style={{ marginRight: 10 }} // Ajusta el espacio entre los botones según sea necesario
        >
          Información personal
        </Button>
        <Button mode="contained" onPress={() => setEditOption(false)}>
          Contraseña
        </Button>
      </View>
    );
  };

  const updateProfile = () => {
    console.log("Update profile");
  };

  const updatePassword = () => {
    console.log("Update password");
  };

  const clearChanges = () => {
    console.log("Clear changes");
  };

  const editInfo = () => {
    return (
      <>
        <Text variant="displaySmall">Información personal</Text>
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
        <Button mode="contained" onPress={() => updateProfile}>
          Actualizar información
        </Button>
      </>
    );
  };

  const editPassword = () => {
    return (
      <>
        <Text variant="displaySmall">Contraseña</Text>
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
        <TextInput
          style={styles.textInput}
          secureTextEntry={hideNewPassword}
          label={"Nueva Contraseña"}
          placeholder={hideNewPassword ? "***********" : "Tu nueva contraseña"}
          placeholderTextColor={"#999"}
          autoComplete={"password"}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          mode={"outlined"}
          right={
            <TextInput.Icon
              icon={hideNewPassword ? "eye" : "eye-off"}
              onPress={handleHideNewPassword}
            />
          }
        />
        <Button mode="contained" onPress={() => updatePassword}>
          Actualizar contraseña
        </Button>
      </>
    );
  };

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          onPress={() => {
            router.back();
          }}
          color="white"
        />
        <Appbar.Content
          title="Editar perfil"
          titleStyle={{ color: colors.white }}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        {optionsButtons()}
        {editOption ? editInfo() : editPassword()}
        <Button mode="contained" onPress={() => clearChanges}>
          Cancelar
        </Button>
      </SafeAreaView>
    </>
  );
};

export default EditProfile;
