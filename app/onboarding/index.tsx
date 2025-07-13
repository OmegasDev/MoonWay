import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Alert,
  ScrollView,
  Platform 
} from 'react-native';
import { 
  Upload, 
  Sparkles, 
  ArrowRight, 
  Link as LinkIcon 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';

const platforms = [
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', color: '#000' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077B5' },
  { id: 'twitter', name: 'Twitter/X', color: '#1DA1F2' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [handle, setHandle] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'screenshot' | 'handle' | 'url' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadMethod('screenshot');
      setStep(2);
    }
  };

  const handleAnalysis = async () => {
    if (!selectedPlatform || (!handle && !profileUrl && uploadMethod !== 'screenshot')) {
      Alert.alert('Missing information', 'Please select a platform and provide your handle, URL, or screenshot.');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      router.replace('/(tabs)');
    }, 3000);
  };

  const renderStep1 = () => (
    <ScrollView className="flex-1 bg-dark px-6 pt-20" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="items-center mb-12">
      <View className="w-20 h-20 mb-6">
           <Image 
             source={require('../../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')}
             className="w-full h-full rounded-2xl"
             resizeMode="contain"
           />
        </View>
        <Text className="text-4xl font-inter-bold text-white text-center mb-4">
          Welcome to MoonWay
        </Text>
        <Text className="text-lg font-inter-regular text-gray-300 text-center">
          Let's optimize your social media presence
        </Text>
      </View>

      <View className="space-y-4">
        <Text className="text-xl font-inter-semibold text-white mb-6 text-center">
          How would you like to get started?
        </Text>

        <TouchableOpacity
          onPress={() => { setUploadMethod('handle'); setStep(2); }}
          className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mr-4">
              <Text className="text-2xl text-primary">@</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-inter-semibold text-white">Enter Handle</Text>
              <Text className="text-gray-400 font-inter-regular">
                Provide your social media username
              </Text>
            </View>
            <ArrowRight size={20} color="#6ec3ec" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setUploadMethod('url'); setStep(2); }}
          className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-secondary/20 rounded-xl items-center justify-center mr-4">
              <LinkIcon size={24} color="#b5bff5" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-inter-semibold text-white">Enter Profile URL</Text>
              <Text className="text-gray-400 font-inter-regular">
                Paste your complete profile link
              </Text>
            </View>
            <ArrowRight size={20} color="#6ec3ec" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleImagePicker}
          className="bg-dark-secondary p-6 rounded-2xl border border-gray-purple"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-accent/20 rounded-xl items-center justify-center mr-4">
              <Upload size={24} color="#616dce" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-inter-semibold text-white">Upload Screenshot</Text>
              <Text className="text-gray-400 font-inter-regular">
                Upload a profile screenshot
              </Text>
            </View>
            <ArrowRight size={20} color="#6ec3ec" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView className="flex-1 bg-dark px-6 pt-20" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="items-center mb-8">
        <Text className="text-3xl font-inter-bold text-white text-center mb-4">
          Profile Analysis Setup
        </Text>
        <Text className="text-gray-300 font-inter-regular text-center">
          Select your platform and provide details for AI analysis
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-lg font-inter-semibold text-white mb-4">Select Platform</Text>
        <View className="grid grid-cols-2 gap-3">
          {platforms.map((platform) => (
            <TouchableOpacity
              key={platform.id}
              onPress={() => setSelectedPlatform(platform.id)}
              className={`p-4 rounded-xl border-2 ${selectedPlatform === platform.id ? 'border-primary bg-primary/10' : 'border-gray-purple bg-dark-secondary'}`}
            >
              <Text className="text-white font-inter-medium text-center">{platform.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {uploadMethod === 'handle' && (
        <View className="mb-8">
          <Text className="text-lg font-inter-semibold text-white mb-4">Enter Your Handle</Text>
          <TextInput
            value={handle}
            onChangeText={setHandle}
            placeholder="@yourusername"
            placeholderTextColor="#718096"
            className="bg-dark-secondary border border-gray-purple rounded-xl p-4 text-white font-inter-regular text-lg"
          />
        </View>
      )}

      {uploadMethod === 'url' && (
        <View className="mb-8">
          <Text className="text-lg font-inter-semibold text-white mb-4">Enter Profile URL</Text>
          <TextInput
            value={profileUrl}
            onChangeText={setProfileUrl}
            placeholder="https://instagram.com/yourusername"
            placeholderTextColor="#718096"
            className="bg-dark-secondary border border-gray-purple rounded-xl p-4 text-white font-inter-regular text-lg"
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>
      )}

      <TouchableOpacity
        onPress={handleAnalysis}
        disabled={isAnalyzing}
        className={`p-4 rounded-xl ${isAnalyzing ? 'bg-gray-600' : 'bg-primary'} items-center justify-center mb-6`}
      >
        {isAnalyzing ? (
          <Text className="text-dark font-inter-semibold text-lg">Analyzing Profile...</Text>
        ) : (
          <View className="flex-row items-center">
            <Sparkles size={20} color="#231c3c" className="mr-2" />
            <Text className="text-dark font-inter-semibold text-lg ml-2">Start AI Analysis</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/(tabs)')}
        className="bg-dark-secondary border border-secondary rounded-xl p-4 items-center mb-8"
      >
        <Text className="text-secondary font-inter-semibold">Skip for Now</Text>
        <Text className="text-gray-400 font-inter-regular text-sm mt-1">
          You can analyze your profile later
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        {step === 1 ? renderStep1() : renderStep2()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
