import React from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/utils/styles';

interface ProfileHeaderProps {
  isEditing: boolean;
  slideAnim: Animated.Value;
  onEditPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  isEditing, 
  slideAnim, 
  onEditPress 
}) => {
  return (
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
          onPress={onEditPress}
        >
          <Feather 
            name={isEditing ? 'check' : 'edit-3'} 
            size={16} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileHeader;
