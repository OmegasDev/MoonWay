import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  ArrowRight,
  Calendar,
  Lightbulb,
  Target
} from 'lucide-react-native';

const DashboardCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = '#6BD099' 
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color?: string;
}) => (
  <View className="bg-dark-secondary p-6 rounded-2xl border border-gray-700">
    <View className="flex-row items-center justify-between mb-4">
      <View className={`w-12 h-12 rounded-xl items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} color={color} />
      </View>
      <Text className="text-primary font-inter-medium">{change}</Text>
    </View>
    <Text className="text-2xl font-inter-bold text-white mb-1">{value}</Text>
    <Text className="text-gray-400 font-inter-regular">{title}</Text>
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
  onPress 
}: {
  title: string;
  description: string;
  icon: any;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-dark-secondary p-6 rounded-2xl border border-gray-700 active:bg-dark-tertiary"
  >
    <View className="flex-row items-center justify-between mb-3">
      <View className="w-10 h-10 bg-primary/20 rounded-lg items-center justify-center">
        <Icon size={20} color="#6BD099" />
      </View>
      <ArrowRight size={16} color="#6BD099" />
    </View>
    <Text className="text-lg font-inter-semibold text-white mb-2">{title}</Text>
    <Text className="text-gray-400 font-inter-regular">{description}</Text>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-dark px-6 pt-16">
      <View className="mb-8">
        <Text className="text-3xl font-inter-bold text-white mb-2">
          Welcome back! 👋
        </Text>
        <Text className="text-gray-300 font-inter-regular">
          Here's your social media performance overview
        </Text>
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
          />
          <DashboardCard
            title="Profile Views"
            value="8.9K"
            change="+12.1%"
            icon={Eye}
            color="#A3E4C4"
          />
          <DashboardCard
            title="Engagement Rate"
            value="7.8%"
            change="+2.3%"
            icon={Heart}
            color="#E6FFF2"
          />
          <DashboardCard
            title="Growth Rate"
            value="4.2%"
            change="+0.8%"
            icon={TrendingUp}
            color="#6BD099"
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
            onPress={() => {}}
          />
          <QuickActionCard
            title="Get Viral Hooks"
            description="Discover trending hooks for your next post"
            icon={Lightbulb}
            onPress={() => {}}
          />
          <QuickActionCard
            title="Analyze Competitor"
            description="Study successful profiles in your niche"
            icon={Target}
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}