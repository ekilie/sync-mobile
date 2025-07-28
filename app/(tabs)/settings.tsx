import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsOption from '../../components/settings/settings-options';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <SettingsOption
        title="Enable Notifications"
        value={notifications}
        onValueChange={setNotifications}
      />
      <SettingsOption
        title="Dark Mode"
        value={darkMode}
        onValueChange={setDarkMode}
      />
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