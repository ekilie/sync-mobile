
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});

export default UserInfo;
