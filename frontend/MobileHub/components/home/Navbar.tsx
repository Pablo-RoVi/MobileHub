import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

const options = ['Editar perfil', 'Cerrar sesión'];

const styles = StyleSheet.create({
    appbarHeader: {
        backgroundColor: Colors.primaryOrange,
    },
    menu: {
        marginTop: 84,
    }
});

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleOptionPress = (option: string) => {
    if (option === 'Cerrar sesión') {
        return "/"
    }
  }

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Action icon="menu" onPress={openMenu} iconColor={Colors.white} />
        <Appbar.Content title="¡Bienvenid@ a MobileHub!" titleStyle={{ color: Colors.white }} />
      </Appbar.Header>

      <Menu
        style={{...styles.menu}}
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={{ x: 0, y: 0 }}
      >
        {options.map((option) => (
            <Link href={option == "Cerrar sesión" ? "/" : "/home/editprofile"} asChild>
                <Menu.Item 
                    key={option} 
                    onPress={() => {handleOptionPress(option)}} 
                    title={option} 
                    titleStyle={{ color: Colors.primaryOrange }}
                />
            </Link>
            )
        )}
      </Menu>
    </>
  );
}

export default Navbar;