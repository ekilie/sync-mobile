import { COLORS } from '@/utils/styles';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

interface SettingsItem {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  type: 'toggle' | 'navigation';
  value?: boolean;
  destructive?: boolean;
}

interface SettingsSectionProps {
  title: string;
  items: SettingsItem[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>(() => {
    const initialStates: { [key: string]: boolean } = {};
    items.forEach((item, index) => {
      if (item.type === 'toggle') {
        initialStates[`${title}-${index}`] = item.value || false;
      }
    });
    return initialStates;
  });

  const handleToggle = (key: string, value: boolean) => {
    setToggleStates(prev => ({ ...prev, [key]: value }));
  };

  const SettingsItem: React.FC<{ item: SettingsItem; index: number }> = ({ item, index }) => {
    const key = `${title}-${index}`;
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    const bgAnim = React.useRef(new Animated.Value(0)).current; // For ripple effect

    const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.97,
          useNativeDriver: true,
        }),
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const bgColor = bgAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', 'rgba(0,0,0,0.04)'],
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={[styles.item, { backgroundColor: bgColor }]}>
            <View
              style={[
                styles.iconContainer,
                item.destructive && styles.destructiveIconContainer,
              ]}
            >
              <Feather
                name={item.icon}
                size={22}
                color={item.destructive ? '#FF3B30' : COLORS.active}
              />
            </View>

            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemTitle,
                  item.destructive && styles.destructiveText,
                ]}
              >
                {item.title}
              </Text>

              {item.type === 'toggle' ? (
                <Switch
                  value={toggleStates[key] || false}
                  onValueChange={(value) => handleToggle(key, value)}
                  trackColor={{
                    false: 'rgba(120, 120, 128, 0.16)',
                    true: COLORS.active,
                  }}
                  thumbColor={Platform.OS === 'android'
                    ? toggleStates[key]
                      ? 'white'
                      : '#f4f3f4'
                    : undefined}
                  ios_backgroundColor="rgba(120, 120, 128, 0.16)"
                />
              ) : (
                <Feather
                  name="chevron-right"
                  size={20}
                  color={COLORS.inactive}
                />
              )}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.section}>
        {items.map((item, index) => (
          <SettingsItem key={`${title}-${index}`} item={item} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 10,
    marginLeft: 4,
    opacity: 0.85,
    letterSpacing: 0.3,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.07)',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 26, 26, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  destructiveIconContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.12)',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primaryText,
  },
  destructiveText: {
    color: '#FF3B30',
  },
});

export default SettingsSection;
