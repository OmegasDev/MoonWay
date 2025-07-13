import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  ArrowRight,
  Calendar,
  Lightbulb,
  Target,
  Upload,
  Camera
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DashboardCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = '#6ec3ec' 
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color?: string;
}) => (
  <View className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple">
    <View className="flex-row items-center justify-between mb-6">
      <View 
        className="w-12 h-12 rounded-xl items-center justify-center" 
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={24} color={color} />
      </View>
      <Text className="text-primary font-inter-medium text-lg">{change}</Text>
    </View>

    <View className="mb-2">
      <Text className="text-3xl font-inter-bold text-white">{value}</Text>
    </View>

    <Text className="text-gray-400 font-inter-regular text-base">{title}</Text>
  </View>
);


const ProfileScoreCard = () => (
  <View className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl border border-primary/30 mb-6">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-inter-bold text-white">Profile Score</Text>
      <TouchableOpacity className="px-4 py-2 bg-primary rounded-lg">
        <Text className="text-dark font-inter-semibold">View Details</Text>
      </TouchableOpacity>
    </View>
    
    <View className="items-center mb-4">
      <View className="w-32 h-32 rounded-full bg-dark-tertiary items-center justify-center border-4 border-primary">
        <Text className="text-4xl font-inter-bold text-primary">87</Text>
        <Text className="text-gray-300 font-inter-medium">/ 100</Text>
      </View>
    </View>
    
    <View className="space-y-3">
      <View className="flex-row justify-between">
        <Text className="text-gray-300 font-inter-regular">Engagement Rate</Text>
        <Text className="text-white font-inter-semibold">Excellent</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-300 font-inter-regular">Content Quality</Text>
        <Text className="text-white font-inter-semibold">Good</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-300 font-inter-regular">Posting Consistency</Text>
        <Text className="text-white font-inter-semibold">Needs Work</Text>
      </View>
    </View>
  </View>
);

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onPress,
  color = '#6ec3ec'
}: {
  title: string;
  description: string;
  icon: any;
  onPress: () => void;
  color?: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple active:bg-dark-tertiary"
  >
    <View className="flex-row items-center justify-between mb-3">
      <View className={`w-10 h-10 rounded-lg items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
        <Icon size={20} color={color} />
      </View>
      <ArrowRight size={16} color="#6ec3ec" />
    </View>
    <Text className="text-lg font-inter-semibold text-white mb-2">{title}</Text>
    <Text className="text-gray-400 font-inter-regular">{description}</Text>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-dark px-6 pt-16">
      {/* Header with Logo */}
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 mr-3">
              <Image 
                source={require('../../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
            </View>
            <Text className="text-3xl font-inter-bold text-white">
              MoonWay
            </Text>
          </View>
          <Text className="text-gray-300 font-inter-regular">
            Welcome back! Here's your social media overview
          </Text>
        </View>
      </View>

      {/* Quick Profile Analysis Access */}
      <View className="bg-secondary/10 border border-secondary/30 p-4 rounded-2xl mb-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white font-inter-semibold text-lg mb-1">
              Need Profile Analysis?
            </Text>
            <Text className="text-gray-300 font-inter-regular">
              Upload screenshot or enter URL to get AI insights
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/onboarding')}
            className="bg-secondary px-4 py-2 rounded-lg"
          >
            <Text className="text-dark font-inter-semibold">Analyze</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ProfileScoreCard />

      <View className="mb-6">
        <Text className="text-xl font-inter-bold text-white mb-4">
          Weekly Analytics
        </Text>
        <View className="grid grid-cols-2 gap-4">
          <DashboardCard
            title="Total Followers"
            value="12.5K"
            change="+5.2%"
            icon={Users}
            color="#6ec3ec"
          />
          <DashboardCard
            title="Profile Views"
            value="8.9K"
            change="+12.1%"
            icon={Eye}
            color="#b5bff5"
          />
          <DashboardCard
            title="Engagement Rate"
            value="7.8%"
            change="+2.3%"
            icon={Heart}
            color="#616dce"
          />
          <DashboardCard
            title="Growth Rate"
            value="4.2%"
            change="+0.8%"
            icon={TrendingUp}
            color="#6ec3ec"
          />
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-xl font-inter-bold text-white mb-4">
          Quick Actions
        </Text>
        <View className="space-y-4">
          <QuickActionCard
            title="Plan This Week"
            description="Create your content calendar and schedule posts"
            icon={Calendar}
            onPress={() => router.push('/(tabs)/planner')}
            color="#6ec3ec"
          />
          <QuickActionCard
            title="Get Viral Hooks"
            description="Discover trending hooks for your next post"
            icon={Lightbulb}
            onPress={() => router.push('/(tabs)/hooks')}
            color="#b5bff5"
          />
          <QuickActionCard
            title="Analyze Competitor"
            description="Study successful profiles in your niche"
            icon={Target}
            onPress={() => router.push('/(tabs)/competitor')}
            color="#616dce"
          />
          <QuickActionCard
            title="Upload Screenshot"
            description="Quick profile analysis from screenshot"
            icon={Upload}
            onPress={() => router.push('/onboarding')}
            color="#635b94"
          />
        </View>
      </View>
    </ScrollView>
  );
}