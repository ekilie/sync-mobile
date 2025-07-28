
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface SettingsOptionProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ title, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default SettingsOption;
