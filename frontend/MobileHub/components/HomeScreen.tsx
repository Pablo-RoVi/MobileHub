import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        padding: 20,
        alignItems: 'center',
        gap: 20
    },
    button: {
        width: '100%'
    
    },
    logo : {
        width: '100%',
        height: '40%'
    }
});

const HomeScreen = () => {
    return (
        <SafeAreaView style={style.container}>
            <Text variant="displayMedium">¡BIENVENID@!</Text>
            <Image source={require('../assets/images/MobileHub.png')} style={style.logo} />
            <Button mode="contained" onPress={() => console.log('Pressed')} style={ style.button }>
                Iniciar Sesión
            </Button>
            <Button mode="outlined" onPress={() => console.log('Pressed')} style={ style.button }>
                Registrarse
            </Button>
        </ SafeAreaView>
    );
}

export default HomeScreen;