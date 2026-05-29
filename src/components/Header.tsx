import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <SymbolView name="terminal" size={24} tintColor="#A78BFA" />

        <Text style={styles.brandText}>SnippetVault</Text>
      </View>

      <View style={styles.headerRight}>
        <SymbolView name="magnifyingglass" size={24} tintColor="#E4E4E7" />

        {/* <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  brandText: {
    color: '#C4B5FD',
    fontSize: 34,
    fontWeight: '700',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  // avatar: {
  //   width: 42,
  //   height: 42,
  //   borderRadius: 999,
  //   backgroundColor: '#8B5CF6',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // avatarText: {
  //   color: '#fff',
  //   fontWeight: '700',
  // },
});
