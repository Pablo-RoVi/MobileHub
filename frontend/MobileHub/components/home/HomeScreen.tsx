import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Repository } from '../../models/Respository';
import { Commit } from "../../models/Commit";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from './Navbar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        alignItems: "center",
        gap: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "100%",
        marginTop: 20,
    },
    card: {
        width: "100%",
        marginTop: 20,
        marginBottom: 10,
    },
    scrollView: {
        width: "100%",
        margin: 0,
        padding: 0,
    }
});

const HomeScreen = () => {

    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const urlRepositories = "http://192.168.0.11:5071/repositories"
    const urlCommits = "http://192.168.0.11:5071/commits"

    useEffect(() => {
        setLoading(true);
        axios.get(urlRepositories)
        .then((response) => {
            setRepositories(response.data);
        })
        .catch((error) => { 
            console.log(error)
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator animating={true} size={"large"} style={styles.loadingContainer}/>
            </SafeAreaView>
        );
    }

    return (
        <>
            <Navbar />
            <SafeAreaView style={styles.container}>
                <Text variant={"displaySmall"}>Mis Repositorios</Text>
                <ScrollView style={styles.scrollView}>
                    {repositories.map((repository) => (
                        <Card style={styles.card} key={repository.name}>
                            <Card.Title 
                                title={repository.name} 
                                titleVariant={"headlineSmall"}
                            />
                            <Card.Content>
                                <Text variant={"bodyMedium"}>
                                    Creado el: {repository.createdAt.split("T")[0]}
                                </Text>
                                <Text variant={"bodyMedium"}>
                                    Actualizado el: {repository.updatedAt.split("T")[0]}
                                </Text>
                                <Text variant={"bodyMedium"}>
                                    Commits: {repository.commitsAmout}
                                </Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button
                                    onPress={() => console.log("Ver más pressed")}
                                    mode={"contained"}
                                >Ver más
                                </Button>
                            </Card.Actions>
                        </Card>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default HomeScreen;
