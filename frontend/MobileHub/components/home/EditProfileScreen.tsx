/**
 * @file EditProfileScreen.tsx
 * @description Edit profile screen of the application.
 * This screen allows users to edit their profile information.
 */
import { HelperText, Text, Appbar, Button, TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import colors from "../../constants/Colors";
import RegularExpressions from "../../constants/RegularExpressions";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

/**
 * Styles for the EditProfileScreen component.
 * @type {object} - CSS EditProfileScreen properties.
 */
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

/**
 * Functional component representing the edit profile screen.
 * @returns The EditProfileScreen component
 */
const EditProfile = () => {
  // Local states for email, password, password visibility, and login error handling.
  const { user, login } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [hidePassword, sethidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [editOption, setEditOption] = useState<boolean>(true);

  // Error handling
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [birthYearError, setBirthYearError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  // Success handling
  const [successUser, setUserSuccess] = useState<boolean>(false);
  const [successPassword, setPasswordSuccess] = useState<boolean>(false);

  /**
   * Handles the change of the email field.
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
   * Handles the change of the name field.
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
   * Handles the change of the birth year field.
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
   * Handles the change of the password field.
   * @param text - Text from the password field.
   */
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  /**
   * Handles the change of the new password field.
   * @param text - Text from the new password field.
   */
  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
  };

  /**
   * Handles the visibility of the password field.
   */
  const handleHidePassword = () => {
    sethidePassword(!hidePassword);
  };

  /**
   * Handles the visibility of the new password field.
   */
  const handleHideNewPassword = () => {
    setHideNewPassword(!hideNewPassword);
  };

  /**
   * Returns the buttons to select the edit option.
   * @returns The buttons to select the edit option.
   */
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

  /**
   * Updates the user profile.
   * @returns The updated user profile.
   */
  const updateProfile = () => {
    setUserSuccess(false);
    
    if (nameError || emailError || birthYearError) {
      return;
    }

    const data = {
      fullName: name,
      email: email,
      birthYear: parseInt(birthYear),
    };
    axios.put(`${Endpoints.urlUser}/update-user/${user?.rut}`, data)
      .then((response) => {
        login(response.data);
        setName(response.data.fullName);
        setEmail(response.data.email);
        setBirthYear(response.data.birthYear.toString());
        setUserSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Updates the user password.
   * @returns The updated user password.
   */
  const updatePassword = () => {
    setPasswordSuccess(false);

    if (password === "" || newPassword === "") {
      setPassword("")
      setNewPassword("")
      setIsEmpty(true);
      console.log("Hay campos vacíos");
      return;
    }

    const data = {
      password: password,
      newPassword: newPassword,
    };
    axios
      .post(`${Endpoints.urlAuth}/login`, {email: user?.email, password: password})
      .catch((error) => {
        setPasswordError(true);
        console.log("Contraseña incorrecta");
      });

    if (passwordError) {
      axios.put(`${Endpoints.urlUser}/update-password/${user?.rut}`, data)
      .then((response) => {
        setPasswordSuccess(true);
        console.log("Contraseña actualizada");
      })
      .catch((error) => {
        setPasswordError(true);
      });
    }
    setPassword("");
    setNewPassword("");
  };

  /**
   * Clears all the changes made by the user.
   */
  const clearChanges = () => {
    setName(user?.fullName || "");
    setEmail(user?.email || "");
    setBirthYear(user?.birthYear.toString() || "");
    setPassword("");
    setNewPassword("");
    setEmailError(false);
    setNameError(false);
    setBirthYearError(false);
    setUserSuccess(false);
  };

  /**
   * Sets the initial values of the fields.
   */
  useEffect(() => {
    setName(user?.fullName || "");
    setEmail(user?.email || "");
    setBirthYear(user?.birthYear.toString() || "");
  }, []);

  /**
   * Returns the edit info component.
   * @returns The edit info component.
   */
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
        <Button mode="contained" style={{marginTop: 20 }} onPress={() => updateProfile()}>
          Actualizar información
        </Button>
      </>
    );
  };

  /**
   * Returns the edit password component.
   * @returns The edit password component.
   */
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
        <Button mode="contained" onPress={() => updatePassword()}>
          Actualizar contraseña
        </Button>
      </>
    );
  };

  /**
   * Returns the success message for the user.
   */
  const showSuccesUser = () => {
    return (
      <HelperText type="info" visible={successUser}>
        Información actualizada
      </HelperText>
    );
  }

  /**
   * Returns the success message for the password.
   */
  const showSuccesPassword = () => {
    return (
      <HelperText type="info" visible={successUser}>
        Contraseña actualizada
      </HelperText>
    );
  }

  /**
   * Returns the empty message.
   */
  const showEmpty = () => {
    return (
      <HelperText type="info" visible={successUser}>
        No hay nada que actualizar
      </HelperText>
    );
  }

  /**
   * Returns the edit profile screen component.
   */
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
        <Button mode="contained" onPress={() => clearChanges()}>
          Cancelar
        </Button>
        {successUser && editOption ? showSuccesUser() : null}
        {successPassword && !editOption ? showSuccesPassword() : null}
        {isEmpty && !editOption ? showEmpty() : null}
      </SafeAreaView>
    </>
  );
};

export default EditProfile;
