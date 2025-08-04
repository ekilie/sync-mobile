import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Animated, 
  Easing
} from 'react-native';
import { COLORS } from '@/utils/styles';
import UserInfo from '../../components/profile/user-info';
import ProfileActions from '../../components/profile/profile-actions';
import ProfileHeader from '../../components/profile/profile-header';
import StatsSection from '../../components/profile/stats-section';
import PreferencesSection from '../../components/profile/preferences-section';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    // Fade-in animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim }
      ]}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader 
          isEditing={isEditing}
          slideAnim={slideAnim}
          onEditPress={() => setIsEditing(!isEditing)}
        />

        <Animated.View style={[styles.content, {
          transform: [{ translateY: slideAnim }]
        }]}>
          <UserInfo isEditing={isEditing} />
          
          <StatsSection />
          
          <ProfileActions isEditing={isEditing} />
          
          <PreferencesSection />
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 70,
  },
});

export default Profile;