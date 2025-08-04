import React, { useState } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  ScrollView, 
  Animated, 
  TouchableOpacity,
  Image,
  Easing
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/utils/styles';
import UserInfo from '../../components/profile/user-info';
import ProfileActions from '../../components/profile/profile-actions';

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
        {/* Profile header with animated background */}
        <Animated.View style={[styles.header, {
          transform: [{ translateY: slideAnim }]
        }]}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editBadge}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Feather 
                name={isEditing ? 'check' : 'edit-3'} 
                size={16} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[styles.content, {
          transform: [{ translateY: slideAnim }]
        }]}>
          <UserInfo isEditing={isEditing} />
          
          <View style={styles.statsContainer}>
            <StatItem value="124" label="Posts" />
            <StatItem value="1.2K" label="Followers" />
            <StatItem value="347" label="Following" />
          </View>
          
          <ProfileActions isEditing={isEditing} />
          
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
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const PreferenceItem = ({ 
  icon, 
  title, 
  value 
}: { 
  icon: React.ComponentProps<typeof Feather>['name']; 
  title: string; 
  value: string 
}) => (
  <TouchableOpacity style={styles.preferenceItem}>
    <View style={styles.preferenceIcon}>
      <Feather name={icon} size={20} color={COLORS.active} />
    </View>
    <View style={styles.preferenceText}>
      <Text style={styles.preferenceTitle}>{title}</Text>
      <Text style={styles.preferenceValue}>{value}</Text>
    </View>
    <Feather name="chevron-right" size={20} color={COLORS.inactive} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#F1F3F5',
    height: 180,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    paddingTop: 50,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.background,
  },
  editBadge: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    backgroundColor: COLORS.active,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 70,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    backgroundColor: 'rgba(241, 243, 245, 0.5)',
    borderRadius: 20,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
  },
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
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 26, 26, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  preferenceText: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  preferenceValue: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
  },
});

export default Profile;