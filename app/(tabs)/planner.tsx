import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Calendar, Plus, Clock, Image as ImageIcon, Video, Mic, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const contentTypes = [
  { id: 'image', name: 'Image', icon: ImageIcon, color: '#6ec3ec' },
  { id: 'video', name: 'Video', icon: Video, color: '#b5bff5' },
  { id: 'story', name: 'Story', icon: Mic, color: '#616dce' },
];

const mockPosts = [
  {
    id: 1,
    day: 'Mon',
    time: '09:00',
    type: 'image',
    title: 'Morning motivation quote',
    status: 'scheduled'
  },
  {
    id: 2,
    day: 'Mon',
    time: '18:00',
    type: 'video',
    title: 'Tutorial: Social media tips',
    status: 'draft'
  },
  {
    id: 3,
    day: 'Wed',
    time: '12:00',
    type: 'image',
    title: 'Behind the scenes content',
    status: 'scheduled'
  },
  {
    id: 4,
    day: 'Fri',
    time: '15:00',
    type: 'story',
    title: 'Q&A session',
    status: 'idea'
  }
];

const PostCard = ({ post }: { post: typeof mockPosts[0] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#6ec3ec';
      case 'draft': return '#b5bff5';
      case 'idea': return '#616dce';
      default: return '#718096';
    }
  };

  const getTypeIcon = (type: string) => {
    const contentType = contentTypes.find(ct => ct.id === type);
    if (!contentType) return ImageIcon;
    return contentType.icon;
  };

  return (
    <View className="bg-dark-secondary p-4 rounded-xl border border-gray-purple mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-primary/20 rounded-lg items-center justify-center mr-3">
            {React.createElement(getTypeIcon(post.type), { size: 16, color: '#6ec3ec' })}
          </View>
          <View>
            <Text className="text-white font-inter-semibold">{post.title}</Text>
            <Text className="text-gray-400 font-inter-regular text-sm">
              {post.time}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View 
            className="px-2 py-1 rounded-full mr-2"
            style={{ backgroundColor: `${getStatusColor(post.status)}20` }}
          >
            <Text 
              className="text-xs font-inter-medium capitalize"
              style={{ color: getStatusColor(post.status) }}
            >
              {post.status}
            </Text>
          </View>
          <TouchableOpacity>
            <MoreHorizontal size={16} color="#718096" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function PlannerScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [showAddPost, setShowAddPost] = useState(false);

  const filteredPosts = mockPosts.filter(post => post.day === selectedDay);

  return (
    <ScrollView className="flex-1 bg-dark px-6 pt-16">
      <View className="flex-row items-center justify-between mb-8">
        <View>
          <Text className="text-3xl font-inter-bold text-white mb-2">
            Weekly Planner
          </Text>
          <Text className="text-gray-300 font-inter-regular">
            Organize and schedule your content
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowAddPost(true)}
          className="w-12 h-12 bg-primary rounded-xl items-center justify-center"
        >
          <Plus size={24} color="#231c3c" />
        </TouchableOpacity>
      </View>

      {/* Week Calendar */}
      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {weekDays.map((day) => {
              const isSelected = selectedDay === day;
              const dayPosts = mockPosts.filter(post => post.day === day);
              
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  className={`items-center p-4 rounded-xl min-w-[80px] ${
                    isSelected ? 'bg-primary' : 'bg-dark-secondary'
                  } border ${isSelected ? 'border-primary' : 'border-gray-purple'}`}
                >
                  <Text className={`font-inter-semibold mb-1 ${
                    isSelected ? 'text-dark' : 'text-white'
                  }`}>
                    {day}
                  </Text>
                  <View className={`w-6 h-6 rounded-full items-center justify-center ${
                    isSelected ? 'bg-dark/20' : 'bg-primary/20'
                  }`}>
                    <Text className={`text-xs font-inter-bold ${
                      isSelected ? 'text-dark' : 'text-primary'
                    }`}>
                      {dayPosts.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Content Types */}
      <View className="mb-6">
        <Text className="text-lg font-inter-semibold text-white mb-4">
          Content Types
        </Text>
        <View className="flex-row space-x-3">
          {contentTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              className="flex-1 bg-dark-secondary p-4 rounded-xl border border-gray-purple items-center"
            >
              <View 
                className="w-10 h-10 rounded-lg items-center justify-center mb-2"
                style={{ backgroundColor: `${type.color}20` }}
              >
                <type.icon size={20} color={type.color} />
              </View>
              <Text className="text-white font-inter-medium text-sm">{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Daily Posts */}
      <View className="mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-inter-semibold text-white">
            {selectedDay} Schedule ({filteredPosts.length})
          </Text>
        </View>
        
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <View className="bg-dark-secondary p-8 rounded-xl border border-gray-purple items-center">
            <Calendar size={48} color="#6ec3ec" className="mb-4" />
            <Text className="text-white font-inter-semibold text-lg mb-2">
              No posts scheduled
            </Text>
            <Text className="text-gray-400 font-inter-regular text-center mb-4">
              Start planning your content for {selectedDay}
            </Text>
            <TouchableOpacity
              onPress={() => setShowAddPost(true)}
              className="bg-primary px-6 py-3 rounded-lg"
            >
              <Text className="text-dark font-inter-semibold">Add Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}