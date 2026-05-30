import Ionicons from '@expo/vector-icons/Ionicons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getLabel(name: string) {
  switch (name) {
    case 'home':
      return 'Home';

    case 'files':
      return 'Files';

    case 'favourites':
      return 'Favourites';

    case 'settings':
      return 'Settings';

    default:
      return '';
  }
}

function getIcon(name: string) {
  switch (name) {
    case 'home':
      return 'home';

    case 'files':
      return 'folder';

    case 'favourites':
      return 'star';

    case 'settings':
      return 'settings';

    default:
      return 'ellipse';
  }
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        return (
          <TabItem
            key={route.key}
            focused={focused}
            icon={getIcon(route.name)}
            label={getLabel(route.name)}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
}

function TabItem({
  focused,
  icon,
  label,
  onPress,
}: {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(focused ? 1.05 : 1),
      },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.tab, focused && styles.activeTab, animatedStyle]}
    >
      <Ionicons name={icon} size={22} color={focused ? '#fff' : '#71717A'} />
      <Text style={[styles.label, focused && styles.activeLabel]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,

    flexDirection: 'row',

    backgroundColor: '#111827',
    borderRadius: 28,

    padding: 8,
  },

  tab: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
  },

  activeLabel: {
    color: '#FFFFFF',
  },
});
