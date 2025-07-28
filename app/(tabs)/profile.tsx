import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserInfo from '../../components/profile/user-info';
import ProfileActions from '../../components/profile/profile-actions';

const Profile = () => {
  return (
    <View style={styles.container}>
      <UserInfo />
      <ProfileActions />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Profile;