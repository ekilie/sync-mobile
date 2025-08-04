import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/utils/styles';

const ProfileActions = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.settingsButton]}
          >
            <Feather name="settings" size={20} color={COLORS.primaryText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
          >
            <Text style={[styles.buttonText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  editButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.active,
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.active,
    flex: 1,
  },
  settingsButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
    width: 52,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    flex: 1,
    minWidth: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.active,
  },
  logoutText: {
    color: '#FF3B30',
  },
});

export default ProfileActions;