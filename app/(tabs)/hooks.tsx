import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Share
} from 'react-native';
import { 
  Lightbulb,
  Search,
  Copy,
  Heart,
  Bookmark,
  Share2,
  Filter,
  TrendingUp
} from 'lucide-react-native';

const categories = [
  { id: 'all', name: 'All', count: 127 },
  { id: 'motivation', name: 'Motivation', count: 34 },
  { id: 'tips', name: 'Tips', count: 28 },
  { id: 'question', name: 'Questions', count: 22 },
  { id: 'story', name: 'Stories', count: 43 },
];

const viralHooks = [
  {
    id: 1,
    category: 'motivation',
    text: "If you're not willing to risk the unusual, you'll have to settle for the ordinary.",
    engagement: '94%',
    saves: '12.3K',
    trending: true
  },
  {
    id: 2,
    category: 'tips',
    text: "3 things I wish I knew before starting my business:",
    engagement: '89%',
    saves: '8.7K',
    trending: false
  },
  {
    id: 3,
    category: 'question',
    text: "What's the biggest mistake you made in your 20s?",
    engagement: '92%',
    saves: '15.1K',
    trending: true
  },
  {
    id: 4,
    category: 'story',
    text: "I lost everything at 25. Here's what I learned:",
    engagement: '96%',
    saves: '18.9K',
    trending: true
  },
  {
    id: 5,
    category: 'tips',
    text: "How to gain 10K followers in 30 days (actually works):",
    engagement: '87%',
    saves: '9.2K',
    trending: false
  }
];

const HookCard = ({ hook }: { hook: typeof viralHooks[0] }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCopy = async () => {
    console.log('Copied:', hook.text);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: hook.text,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple mb-4">
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1 mr-4">
          <Text className="text-white font-inter-medium text-lg leading-6">
            {hook.text}
          </Text>
        </View>
        {hook.trending && (
          <View className="bg-primary/20 px-2 py-1 rounded-full">
            <View className="flex-row items-center">
              <TrendingUp size={12} color="#6ec3ec" />
              <Text className="text-primary font-inter-semibold text-xs ml-1">
                Trending
              </Text>
            </View>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row space-x-4">
          <View className="items-center">
            <Text className="text-primary font-inter-bold">{hook.engagement}</Text>
            <Text className="text-gray-400 font-inter-regular text-xs">Engagement</Text>
          </View>
          <View className="items-center">
            <Text className="text-secondary font-inter-bold">{hook.saves}</Text>
            <Text className="text-gray-400 font-inter-regular text-xs">Saves</Text>
          </View>
        </View>

        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={() => setIsLiked(!isLiked)}
            className="w-10 h-10 bg-dark-tertiary rounded-lg items-center justify-center"
          >
            <Heart 
              size={18} 
              color={isLiked ? "#6ec3ec" : "#718096"}
              fill={isLiked ? "#6ec3ec" : "transparent"}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setIsSaved(!isSaved)}
            className="w-10 h-10 bg-dark-tertiary rounded-lg items-center justify-center"
          >
            <Bookmark 
              size={18} 
              color={isSaved ? "#b5bff5" : "#718096"}
              fill={isSaved ? "#b5bff5" : "transparent"}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleCopy}
            className="w-10 h-10 bg-dark-tertiary rounded-lg items-center justify-center"
          >
            <Copy size={18} color="#718096" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleShare}
            className="w-10 h-10 bg-primary rounded-lg items-center justify-center"
          >
            <Share2 size={18} color="#231c3c" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function HooksScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHooks = viralHooks.filter(hook => {
    const matchesCategory = selectedCategory === 'all' || hook.category === selectedCategory;
    const matchesSearch = hook.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView className="flex-1 bg-dark px-6 pt-16">
      <View className="mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-inter-bold text-white mb-2">
              Viral Hooks Bank
            </Text>
            <Text className="text-gray-300 font-inter-regular">
              Proven hooks that drive engagement
            </Text>
          </View>
          <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center">
            <Lightbulb size={24} color="#6ec3ec" />
          </View>
        </View>

        {/* Search */}
        <View className="relative mb-6">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search hooks..."
            placeholderTextColor="#718096"
            className="bg-dark-secondary border border-gray-purple rounded-xl p-4 pl-12 text-white font-inter-regular"
          />
          <Search size={20} color="#718096" className="absolute left-4 top-4" />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row space-x-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl border ${
                    isSelected 
                      ? 'bg-primary border-primary' 
                      : 'bg-dark-secondary border-gray-purple'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Text className={`font-inter-semibold ${
                      isSelected ? 'text-dark' : 'text-white'
                    }`}>
                      {category.name}
                    </Text>
                    <Text className={`ml-2 text-xs font-inter-medium ${
                      isSelected ? 'text-dark/70' : 'text-gray-400'
                    }`}>
                      {category.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Results */}
      <View className="mb-4">
        <Text className="text-lg font-inter-semibold text-white mb-4">
          {filteredHooks.length} hooks found
        </Text>
      </View>

      {/* Hooks List */}
      <View className="mb-8">
        {filteredHooks.map((hook) => (
          <HookCard key={hook.id} hook={hook} />
        ))}
      </View>
    </ScrollView>
  );
}