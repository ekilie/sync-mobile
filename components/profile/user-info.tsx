import React from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { COLORS } from '@/utils/styles';

const UserInfo = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.handle}>@johndoe</Text>
      <Text style={styles.bio}>
        Digital designer • Photography enthusiast • Coffee lover
      </Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              defaultValue="john.doe@example.com"
              autoFocus={true}
            />
          ) : (
            <Text style={styles.infoValue}>john.doe@example.com</Text>
          )}
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Location</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              defaultValue="San Francisco, CA"
            />
          ) : (
            <Text style={styles.infoValue}>San Francisco, CA</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: 4,
  },
  handle: {
    fontSize: 16,
    color: COLORS.secondaryText,
    marginBottom: 16,
  },
  bio: {
    fontSize: 15,
    color: COLORS.primaryText,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 16,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.primaryText,
  },
  input: {
    fontSize: 16,
    color: COLORS.primaryText,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(241, 243, 245, 0.5)',
    borderRadius: 12,
  },
});

export default UserInfo;