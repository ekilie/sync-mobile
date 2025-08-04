import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PreferencesSection } from '@/components/profile';

const Settings = () => {
  return (
    <View style={styles.container}>
      <PreferencesSection/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default Settings;