import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  Dialog,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Repository } from "../../models/Respository";
import { Commit } from "../../models/Commit";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "./Navbar";
import Endpoints from "../api/Endpoints";

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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});

const HomeScreen = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [repositoyCommitName, setRepositoryCommitName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const getCommits = (repositoryName: string) => {
    setLoading(true);
    axios
      .get(`${Endpoints.url}/commits/${repositoryName}`)
      .then((response) => {
        setCommits(response.data);
        setRepositoryCommitName(repositoryName);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const repositoryList = () => {
    return (
      <>
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
                  Commits: {repository.commitsAmount}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() => {
                    getCommits(repository.name);
                    setVisible(true);
                  }}
                  mode={"contained"}
                >
                  Ver más
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </>
    );
  };

  const commitList = () => {
    return (
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Commits de {repositoyCommitName}</Dialog.Title>
        <ScrollView style={styles.scrollView}>
          <Dialog.Content>
            {commits.map((commit, index) => (
              <Card style={styles.card} key={index}>
                <Card.Title
                  title={commit.author}
                  titleVariant={"headlineSmall"}
                />
                <Card.Content>
                  <Text variant={"bodyMedium"}>Commits: {commit.commit}</Text>
                  <Text variant={"bodyMedium"}>
                    Creado el: {commit.createdAt.split("T")[0]}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </Dialog.Content>
        </ScrollView>
      </Dialog>
    );
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Endpoints.url}/repositories`)
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          style={styles.loadingContainer}
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Navbar />
      <SafeAreaView style={styles.container}>
        {repositoryList()}
        {commitList()}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
