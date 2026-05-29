import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

const palette = {
  background: '#050B1A',
  tabBar: 'rgba(17, 24, 39, 0.96)',
  accent: '#8B5CF6',
  inactive: '#71717A',
  active: '#FFFFFF',
  border: 'rgba(255,255,255,0.08)',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        sceneStyle: {
          backgroundColor: palette.background,
        },

        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          height: 72,

          backgroundColor: palette.tabBar,

          borderRadius: 28,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: palette.border,

          paddingTop: 8,
          paddingBottom: 8,

          elevation: 0,
        },

        tabBarActiveTintColor: palette.active,
        tabBarInactiveTintColor: palette.inactive,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" size={size ?? 22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size ?? 22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
