import { COLORS } from '@/utils/styles';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { showToast } from '../../lib/toast';

interface QuickAction {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  color: string;
  backgroundColor: string;
  toastMsg: string;
}

const QuickActionsCard: React.FC = () => {
  const quickActions: QuickAction[] = [
    {
      icon: 'user-plus',
      title: 'Invite Friends',
      color: '#007AFF',
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
      toastMsg: 'Invite friends feature coming soon! 🎉',
    },
    {
      icon: 'database',
      title: 'Backup Data',
      color: '#34C759',
      backgroundColor: 'rgba(52, 199, 89, 0.1)',
      toastMsg: 'Backup feature coming soon! 🔒',
    },
    {
      icon: 'share',
      title: 'Share App',
      color: '#FF9500',
      backgroundColor: 'rgba(255, 149, 0, 0.1)',
      toastMsg: 'Share app feature coming soon! 🚀',
    },
    {
      icon: 'life-buoy',
      title: 'Get Help',
      color: '#FF3B30',
      backgroundColor: 'rgba(255, 59, 48, 0.1)',
      toastMsg: 'Help & support coming soon! 💬',
    },
  ];

  const QuickActionButton: React.FC<{ action: QuickAction; index: number }> = ({ action, index }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    const slideAnim = React.useRef(new Animated.Value(30)).current;

    React.useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, [index, slideAnim]);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={[
          styles.actionButton,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        <TouchableOpacity
          style={[styles.actionContent, { backgroundColor: action.backgroundColor }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => {
            showToast(action.toastMsg, 'info');
          }}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
            <Feather name={action.icon} size={20} color="white" />
          </View>
          <Text style={styles.actionTitle}>{action.title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <QuickActionButton 
            key={action.title} 
            action={action} 
            index={index} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryText,
    marginBottom: 14,
    marginLeft: 4,
    letterSpacing: 0.3,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    marginBottom: 14,
  },
  actionContent: {
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primaryText,
    textAlign: "center",
  },
});


export default QuickActionsCard;
