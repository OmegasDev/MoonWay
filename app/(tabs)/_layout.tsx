import { Tabs } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ChartBar as BarChart3, Calendar, Lightbulb, Users, Upload, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <View className="flex-1">
      {/* Top Settings Button */}
      <View className="absolute top-16 right-6 z-50">
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          className="w-12 h-12 bg-dark-secondary/90 rounded-full items-center justify-center border border-gray-purple"
        >
          <Settings size={20} color="#6ec3ec" />
        </TouchableOpacity>
      </View>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#231c3c',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarActiveTintColor: '#6ec3ec',
          tabBarInactiveTintColor: '#718096',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter-Medium',
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: 'Upload',
            tabBarIcon: ({ size, color }) => (
              <Upload size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="planner"
          options={{
            title: 'Planner',
            tabBarIcon: ({ size, color }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="hooks"
          options={{
            title: 'Viral Hooks',
            tabBarIcon: ({ size, color }) => (
              <Lightbulb size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="competitor"
          options={{
            title: 'Competitor',
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}