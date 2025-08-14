import { COLORS } from '@/utils/styles';
import React from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  SettingsHeader,
  SettingsSection,
} from '../../components/settings';

const Settings = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <SettingsHeader />
          
          {/* <UserSettingsCard /> */}
          
          <SettingsSection
            title="Preferences"
            items={[
              { icon: 'bell', title: 'Push Notifications', type: 'toggle', value: true },
              { icon: 'volume-2', title: 'Sound Effects', type: 'toggle', value: true },
              { icon: 'smartphone', title: 'Haptic Feedback', type: 'toggle', value: false },
            ]}
          />
          
          
          <SettingsSection
            title="Privacy & Security"
            items={[
              { icon: 'lock', title: 'Privacy Settings', type: 'navigation' },
              { icon: 'shield', title: 'Two-Factor Authentication', type: 'navigation' },
              { icon: 'eye-off', title: 'Block Users', type: 'navigation' },
              { icon: 'key', title: 'Change Password', type: 'navigation' },
            ]}
          />
          
          <SettingsSection
            title="Account"
            items={[
              { icon: 'user', title: 'Edit Profile', type: 'navigation' },
              { icon: 'download', title: 'Data Export', type: 'navigation' },
              { icon: 'trash-2', title: 'Delete Account', type: 'navigation', destructive: true },
            ]}
          />
          
          <SettingsSection
            title="Support"
            items={[
              { icon: 'help-circle', title: 'Help Center', type: 'navigation' },
              { icon: 'message-circle', title: 'Contact Support', type: 'navigation' },
              { icon: 'star', title: 'Rate App', type: 'navigation' },
              { icon: 'info', title: 'About', type: 'navigation' },
            ]}
          />
          
          <View style={styles.footer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.copyrightText}>© 2025 Sync Mobile</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: COLORS.inactive,
  },
});

export default Settings;