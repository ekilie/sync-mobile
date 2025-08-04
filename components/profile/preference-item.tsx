import { COLORS } from '@/utils/styles';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PreferenceItemProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  value: string;
}

const PreferenceItem: React.FC<PreferenceItemProps> = ({ 
  icon, 
  title, 
  value 
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

export default PreferenceItem;
