import { COLORS } from '@/utils/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
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
});

export default StatItem;
