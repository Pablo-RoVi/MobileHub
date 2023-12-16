import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

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
    card: {
        width: "100%",
        marginTop: 20,
    }
  });

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text variant={"displaySmall"}>Mis Repositorios</Text>
            <Card style={styles.card}>
                <Card.Title 
                    title={"Repositorio uno"} 
                    titleVariant={"headlineSmall"}
                />
                <Card.Content>
                    <Text variant={"bodyMedium"}>Creado el: </Text>
                    <Text variant={"bodyMedium"}>Actualizado el: </Text>
                    <Text variant={"bodyMedium"}>Commits: </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        onPress={() => console.log("Ver más pressed")}
                        mode={"contained"}
                    >Ver más
                    </Button>
                </Card.Actions>
            </Card>
        </SafeAreaView>
    );
}

export default HomeScreen;
