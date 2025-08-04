import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatItem from './stat-item';

const StatsSection: React.FC = () => {
  return (
    <View style={styles.statsContainer}>
      <StatItem value="124" label="Posts" />
      <StatItem value="1.2K" label="Followers" />
      <StatItem value="347" label="Following" />
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    backgroundColor: 'rgba(241, 243, 245, 0.5)',
    borderRadius: 20,
    paddingVertical: 20,
  },
});

export default StatsSection;
