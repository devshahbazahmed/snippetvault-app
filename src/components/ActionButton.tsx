import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function ActionButton({ icon, label, danger, onPress }: any) {
  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={24} color={danger ? '#FCA5A5' : '#D4D4D8'} />

      <Text style={[styles.actionText, danger && { color: '#FCA5A5' }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },

  actionText: {
    color: '#D4D4D8',
    fontWeight: '600',
  },
});
