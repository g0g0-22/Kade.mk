import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function TabLayout() {
  return (
    <SafeAreaProvider>
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#077A7D',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false, // optional: hide header for all screens
      }}>
      <Tabs.Screen
        name="index"
        options={{
          animation: 'shift',
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Feather name='compass' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          animation: 'shift',
          title: 'Map',
          tabBarIcon: ({ color, size }) => <Feather name='map-pin' color={color} size={size} />,
        }}
      />
    </Tabs>
    </SafeAreaProvider>
  );
}
