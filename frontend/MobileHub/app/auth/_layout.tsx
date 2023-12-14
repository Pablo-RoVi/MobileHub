import { Slot, router } from "expo-router";
import { Appbar } from "react-native-paper";

const styles = {
  appbar: {
    margin: 0,
  },
}

const handleBack = () => {
  router.back();
}

const AuthLayout = () => {
  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => handleBack()} />
      </Appbar.Header>
      <Slot />
    </>
  );
};

export default AuthLayout;
