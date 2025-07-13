import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Upload, 
  Camera, 
  Link as LinkIcon, 
  MessageCircle, 
  ChevronDown,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const niches = [
  'Fitness & Health',
  'Business & Entrepreneurship',
  'Lifestyle & Fashion',
  'Food & Cooking',
  'Travel & Adventure',
  'Technology & Gaming',
  'Art & Design',
  'Music & Entertainment',
  'Education & Learning',
  'Beauty & Skincare',
  'Finance & Investment',
  'Parenting & Family',
  'Sports & Recreation',
  'Home & Garden',
  'Photography',
  'Other'
];

const platforms = [
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', color: '#000' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077B5' },
  { id: 'twitter', name: 'Twitter/X', color: '#1DA1F2' },
];

export default function UploadScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hi there! 👋 I'm your AI social media optimizer. Let's boost your profile together! First, I need to analyze your current profile.",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    profileMethod: '',
    profileUrl: '',
    selectedPlatform: '',
    selectedNiche: '',
    inspirationUrl: '',
    goals: ''
  });
  const [showNicheDropdown, setShowNicheDropdown] = useState(false);

  const addMessage = (text: string, type: 'user' | 'ai') => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({...formData, profileMethod: 'screenshot'});
      addMessage("📸 Screenshot uploaded successfully!", 'user');
      
      simulateTyping(() => {
        addMessage("Perfect! I can see your profile screenshot. Now, which platform is this from?", 'ai');
        setCurrentStep(2);
      });
    }
  };

  const handleCameraCapture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({...formData, profileMethod: 'camera'});
      addMessage("📷 Photo captured successfully!", 'user');
      
      simulateTyping(() => {
        addMessage("Great shot! I can analyze your profile from this image. Which platform is this from?", 'ai');
        setCurrentStep(2);
      });
    }
  };

  const handleUrlSubmit = () => {
    if (!formData.profileUrl.trim()) {
      Alert.alert('Error', 'Please enter a valid profile URL');
      return;
    }

    setFormData({...formData, profileMethod: 'url'});
    addMessage(`🔗 Profile URL: ${formData.profileUrl}`, 'user');
    
    simulateTyping(() => {
      addMessage("Excellent! I can access your profile directly. Which platform is this profile from?", 'ai');
      setCurrentStep(2);
    });
  };

  const handlePlatformSelect = (platform: any) => {
    setFormData({...formData, selectedPlatform: platform.id});
    addMessage(`📱 Platform: ${platform.name}`, 'user');
    
    simulateTyping(() => {
      addMessage("Perfect! Now, what's your niche or content category? This helps me provide more targeted recommendations.", 'ai');
      setCurrentStep(3);
    });
  };

  const handleNicheSelect = (niche: string) => {
    setFormData({...formData, selectedNiche: niche});
    setShowNicheDropdown(false);
    addMessage(`🎯 Niche: ${niche}`, 'user');
    
    simulateTyping(() => {
      addMessage("Great choice! Do you have any profiles that inspire you or that you'd like your profile to be similar to? (Optional)", 'ai');
      setCurrentStep(4);
    });
  };

  const handleInspirationSubmit = () => {
    if (formData.inspirationUrl.trim()) {
      addMessage(`✨ Inspiration: ${formData.inspirationUrl}`, 'user');
    } else {
      addMessage("⏭️ Skipping inspiration profile", 'user');
    }
    
    simulateTyping(() => {
      addMessage("Almost done! What are your main goals? (e.g., increase followers, boost engagement, improve content quality)", 'ai');
      setCurrentStep(5);
    });
  };

  const handleGoalsSubmit = () => {
    if (!formData.goals.trim()) {
      Alert.alert('Error', 'Please share your goals to get personalized recommendations');
      return;
    }

    addMessage(`🎯 Goals: ${formData.goals}`, 'user');
    
    simulateTyping(() => {
      addMessage("Perfect! I have everything I need. Let me analyze your profile and create your personalized optimization plan... 🚀", 'ai');
      
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 2000);
    }, 2000);
  };

  const renderChatMessage = (message: any) => (
    <View key={message.id} className={`mb-4 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-[80%] p-4 rounded-2xl ${
        message.type === 'user' 
          ? 'bg-primary rounded-br-md' 
          : 'bg-dark-secondary rounded-bl-md'
      }`}>
        <Text className={`font-inter-regular ${
          message.type === 'user' ? 'text-dark' : 'text-white'
        }`}>
          {message.text}
        </Text>
      </View>
    </View>
  );

  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="space-y-4">
            <TouchableOpacity
              onPress={handleImageUpload}
              className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple active:bg-dark-tertiary"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mr-4">
                  <Upload size={24} color="#6ec3ec" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-inter-semibold text-white">Upload Screenshot</Text>
                  <Text className="text-gray-400 font-inter-regular">
                    Upload a screenshot of your profile
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

           

            <View className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-accent/20 rounded-xl items-center justify-center mr-4">
                  <LinkIcon size={24} color="#616dce" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-inter-semibold text-white">Enter Profile URL</Text>
                  <Text className="text-gray-400 font-inter-regular">
                    Paste your complete profile link
                  </Text>
                </View>
              </View>
              <TextInput
                value={formData.profileUrl}
                onChangeText={(text) => setFormData({...formData, profileUrl: text})}
                placeholder="https://instagram.com/yourusername"
                placeholderTextColor="#718096"
                className="bg-dark-tertiary border border-gray-purple rounded-xl p-4 text-white font-inter-regular mb-4"
                autoCapitalize="none"
                keyboardType="url"
              />
              <TouchableOpacity
                onPress={handleUrlSubmit}
                className="bg-primary p-3 rounded-xl items-center"
              >
                <Text className="text-dark font-inter-semibold">Submit URL</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 2:
        return (
          <View className="space-y-3">
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                onPress={() => handlePlatformSelect(platform)}
                className="bg-dark-secondary p-4 rounded-xl border border-gray-purple active:bg-dark-tertiary"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-white font-inter-semibold">{platform.name}</Text>
                  <ArrowRight size={20} color="#6ec3ec" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View>
            <TouchableOpacity
              onPress={() => setShowNicheDropdown(!showNicheDropdown)}
              className="bg-dark-secondary p-4 rounded-xl border border-gray-purple mb-4"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-white font-inter-semibold">
                  {formData.selectedNiche || 'Select your niche'}
                </Text>
                <ChevronDown size={20} color="#6ec3ec" />
              </View>
            </TouchableOpacity>

            {showNicheDropdown && (
              <ScrollView className="max-h-64 bg-dark-secondary rounded-xl border border-gray-purple">
                {niches.map((niche) => (
                  <TouchableOpacity
                    key={niche}
                    onPress={() => handleNicheSelect(niche)}
                    className="p-4 border-b border-gray-purple"
                  >
                    <Text className="text-white font-inter-regular">{niche}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        );

      case 4:
        return (
          <View className="space-y-4">
            <TextInput
              value={formData.inspirationUrl}
              onChangeText={(text) => setFormData({...formData, inspirationUrl: text})}
              placeholder="https://instagram.com/inspiration_profile (optional)"
              placeholderTextColor="#718096"
              className="bg-dark-secondary border border-gray-purple rounded-xl p-4 text-white font-inter-regular"
              autoCapitalize="none"
              keyboardType="url"
            />
            <TouchableOpacity
              onPress={handleInspirationSubmit}
              className="bg-primary p-4 rounded-xl items-center"
            >
              <Text className="text-dark font-inter-semibold">Continue</Text>
            </TouchableOpacity>
          </View>
        );

      case 5:
        return (
          <View className="space-y-4">
            <TextInput
              value={formData.goals}
              onChangeText={(text) => setFormData({...formData, goals: text})}
              placeholder="e.g., Increase followers, boost engagement, improve content quality..."
              placeholderTextColor="#718096"
              className="bg-dark-secondary border border-gray-purple rounded-xl p-4 text-white font-inter-regular"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity
              onPress={handleGoalsSubmit}
              className="bg-primary p-4 rounded-xl items-center flex-row justify-center"
            >
              <Sparkles size={20} color="#231c3c" />
              <Text className="text-dark font-inter-semibold ml-2">Start Analysis</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-dark">
      {/* Header */}
      <View className="px-6 pt-16 pb-4 border-b border-gray-purple">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 mr-3">
              <Image 
                source={require('../../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
            </View>
            <View>
              <Text className="text-xl font-inter-bold text-white">Profile Optimizer</Text>
              <Text className="text-sm font-inter-regular text-gray-400">AI Assistant</Text>
            </View>
          </View>
          <View className="w-3 h-3 bg-primary rounded-full" />
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView className="flex-1 px-6 py-4">
        {chatMessages.map(renderChatMessage)}
        
        {isTyping && (
          <View className="items-start mb-4">
            <View className="bg-dark-secondary p-4 rounded-2xl rounded-bl-md">
              <View className="flex-row space-x-1">
                <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className="px-6 py-4 border-t border-gray-purple">
        {renderCurrentStepContent()}
      </View>
    </View>
  );
} 