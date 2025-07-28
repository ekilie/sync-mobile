
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ProfileActions = () => {
  return (
    <View style={styles.container}>
      <Button title="Edit Profile" onPress={() => {}} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Log Out" onPress={() => {}} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ProfileActions;
