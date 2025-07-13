import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { Users, Search, TrendingUp, Eye, Heart, MessageCircle, Share2, ChartBar as BarChart3, Clock } from 'lucide-react-native';

const platforms = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'twitter', name: 'Twitter/X' },
  { id: 'facebook', name: 'Facebook' },
];

const competitorData = {
  profile: {
    username: '@socialmediaguru',
    followers: '234K',
    following: '892',
    posts: '1,247',
    engagementRate: '8.4%',
    avgViews: '45.2K',
    growthRate: '+12.3%'
  },
  recentPosts: [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: '12.3K',
      comments: '234',
      shares: '89',
      caption: '5 secrets to viral content that nobody talks about...'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: '8.7K',
      comments: '156',
      shares: '67',
      caption: 'Why 99% of creators fail (and how to be different)'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: '15.1K',
      comments: '289',
      shares: '123',
      caption: 'From 0 to 100K followers: My complete strategy'
    }
  ],
  insights: [
    {
      title: 'Best Posting Times',
      value: '6-8 PM weekdays',
      icon: Clock
    },
    {
      title: 'Top Content Type',
      value: 'Educational carousels',
      icon: BarChart3
    },
    {
      title: 'Average Post Frequency',
      value: '1.2 posts/day',
      icon: TrendingUp
    }
  ]
};

const MetricCard = ({ title, value, icon: Icon, color = '#6ec3ec' }: {
  title: string;
  value: string;
  icon: any;
  color?: string;
}) => (
  <View className="bg-dark-secondary p-4 rounded-xl border border-gray-purple items-center">
    <View 
      className="w-10 h-10 rounded-lg items-center justify-center mb-2"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon size={20} color={color} />
    </View>
    <Text className="text-lg font-inter-bold text-white">{value}</Text>
    <Text className="text-gray-400 font-inter-regular text-sm text-center">{title}</Text>
  </View>
);

const PostCard = ({ post }: { post: typeof competitorData.recentPosts[0] }) => (
  <View className="bg-dark-secondary rounded-xl border border-gray-purple overflow-hidden mb-4">
    <Image 
      source={{ uri: post.image }}
      className="w-full h-48"
      resizeMode="cover"
    />
    
    <View className="p-4">
      <Text className="text-white font-inter-medium mb-3 leading-5">
        {post.caption}
      </Text>
      
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Heart size={16} color="#6ec3ec" />
          <Text className="text-gray-300 font-inter-medium ml-1 mr-4">{post.likes}</Text>
        </View>
        <View className="flex-row items-center">
          <MessageCircle size={16} color="#b5bff5" />
          <Text className="text-gray-300 font-inter-medium ml-1 mr-4">{post.comments}</Text>
        </View>
        <View className="flex-row items-center">
          <Share2 size={16} color="#616dce" />
          <Text className="text-gray-300 font-inter-medium ml-1">{post.shares}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default function CompetitorScreen() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [searchHandle, setSearchHandle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(true);

  const handleAnalyze = () => {
    if (!searchHandle.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-dark px-6 pt-16">
      <View className="mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-inter-bold text-white mb-2">
              Competitor Analysis
            </Text>
            <Text className="text-gray-300 font-inter-regular">
              Study successful profiles in your niche
            </Text>
          </View>
          <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center">
            <Users size={24} color="#6ec3ec" />
          </View>
        </View>

        {/* Platform Selection */}
        <View className="mb-6">
          <Text className="text-lg font-inter-semibold text-white mb-3">
            Select Platform
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {platforms.map((platform) => {
                const isSelected = selectedPlatform === platform.id;
                return (
                  <TouchableOpacity
                    key={platform.id}
                    onPress={() => setSelectedPlatform(platform.id)}
                    className={`px-4 py-2 rounded-xl border ${
                      isSelected 
                        ? 'bg-primary border-primary' 
                        : 'bg-dark-secondary border-gray-purple'
                    }`}
                  >
                    <Text className={`font-inter-semibold ${
                      isSelected ? 'text-dark' : 'text-white'
                    }`}>
                      {platform.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Search Input */}
        <View className="mb-6">
          <Text className="text-lg font-inter-semibold text-white mb-3">
            Enter Handle to Analyze
          </Text>
          <View className="flex-row space-x-3">
            <View className="flex-1 relative">
              <TextInput
                value={searchHandle}
                onChangeText={setSearchHandle}
                placeholder="@username"
                placeholderTextColor="#718096"
                className="bg-dark-secondary border border-gray-purple rounded-xl p-4 text-white font-inter-regular"
              />
            </View>
            <TouchableOpacity
              onPress={handleAnalyze}
              disabled={isAnalyzing || !searchHandle.trim()}
              className={`px-6 py-4 rounded-xl ${
                isAnalyzing || !searchHandle.trim() ? 'bg-gray-600' : 'bg-primary'
              } items-center justify-center`}
            >
              {isAnalyzing ? (
                <Text className="text-dark font-inter-semibold">...</Text>
              ) : (
                <Search size={20} color="#231c3c" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {hasResults && (
        <>
          {/* Profile Overview */}
          <View className="mb-6">
            <Text className="text-xl font-inter-bold text-white mb-4">
              Profile Overview
            </Text>
            <View className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple mb-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl font-inter-bold text-white">
                  {competitorData.profile.username}
                </Text>
                <View className="bg-primary/20 px-3 py-1 rounded-full">
                  <Text className="text-primary font-inter-semibold">
                    {competitorData.profile.growthRate}
                  </Text>
                </View>
              </View>
              
              <View className="grid grid-cols-3 gap-4 mb-4">
                <MetricCard
                  title="Followers"
                  value={competitorData.profile.followers}
                  icon={Users}
                  color="#6ec3ec"
                />
                <MetricCard
                  title="Avg Views"
                  value={competitorData.profile.avgViews}
                  icon={Eye}
                  color="#b5bff5"
                />
                <MetricCard
                  title="Engagement"
                  value={competitorData.profile.engagementRate}
                  icon={Heart}
                  color="#616dce"
                />
              </View>
            </View>
          </View>

          {/* Key Insights */}
          <View className="mb-6">
            <Text className="text-xl font-inter-bold text-white mb-4">
              Key Insights
            </Text>
            <View className="space-y-3">
              {competitorData.insights.map((insight, index) => (
                <View 
                  key={index}
                  className="bg-dark-secondary p-4 rounded-xl border border-gray-purple flex-row items-center"
                >
                  <View className="w-10 h-10 bg-primary/20 rounded-lg items-center justify-center mr-4">
                    <insight.icon size={20} color="#6ec3ec" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-inter-semibold">{insight.title}</Text>
                    <Text className="text-gray-400 font-inter-regular">{insight.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Posts */}
          <View className="mb-8">
            <Text className="text-xl font-inter-bold text-white mb-4">
              Top Performing Posts
            </Text>
            {competitorData.recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}