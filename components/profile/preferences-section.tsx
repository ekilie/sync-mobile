import { COLORS } from '@/utils/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PreferenceItem from './preference-item';

const PreferencesSection: React.FC = () => {
  return (
    <>
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Preferences</Text>
      <PreferenceItem 
        icon="moon" 
        title="Dark Mode" 
        value="On" 
      />
      <PreferenceItem 
        icon="bell" 
        title="Notifications" 
        value="Custom" 
      />
      <PreferenceItem 
        icon="lock" 
        title="Privacy" 
        value="Protected" 
      />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 16,
  },
});

export default PreferencesSection;
