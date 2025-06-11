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
import { Camera, Upload, Sparkles, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

const platforms = [
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', color: '#000' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077B5' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [handle, setHandle] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'screenshot' | 'handle' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

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

  const handleCameraCapture = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Camera permission is needed to take photos.');
        return;
      }
    }
    // Camera implementation would go here
    setUploadMethod('screenshot');
    setStep(2);
  };

  const handleAnalysis = async () => {
    if (!selectedPlatform || (!handle && uploadMethod !== 'screenshot')) {
      Alert.alert('Missing information', 'Please select a platform and provide your handle or screenshot.');
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
    <View className="flex-1 bg-dark px-6 pt-20">
      <View className="items-center mb-12">
        <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-6">
          <Sparkles size={40} color="#1a1a1a" />
        </View>
        <Text className="text-4xl font-inter-bold text-white text-center mb-4">
          Welcome to Zobo-ai
        </Text>
        <Text className="text-lg font-inter-regular text-gray-300 text-center">
          AI-powered social media optimization
        </Text>
      </View>

      <View className="space-y-4">
        <Text className="text-xl font-inter-semibold text-white mb-6 text-center">
          How would you like to get started?
        </Text>

        <TouchableOpacity
          onPress={() => {
            setUploadMethod('handle');
            setStep(2);
          }}
          className="bg-dark-secondary p-6 rounded-2xl border border-gray-600 active:bg-dark-tertiary"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mr-4">
              <Text className="text-2xl">@</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-inter-semibold text-white">Enter Handle</Text>
              <Text className="text-gray-400 font-inter-regular">
                Provide your social media username
              </Text>
            </View>
            <ArrowRight size={20} color="#6BD099" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleImagePicker}
          className="bg-dark-secondary p-6 rounded-2xl border border-gray-600 active:bg-dark-tertiary"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-secondary/20 rounded-xl items-center justify-center mr-4">
              <Upload size={24} color="#A3E4C4" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-inter-semibold text-white">Upload Screenshot</Text>
              <Text className="text-gray-400 font-inter-regular">
                Upload a profile screenshot
              </Text>
            </View>
            <ArrowRight size={20} color="#6BD099" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCameraCapture}
          className="bg-dark-secondary p-6 rounded-2xl border border-gray-600 active:bg-dark-tertiary"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-accent/20 rounded-xl items-center justify-center mr-4">
              <Camera size={24} color="#E6FFF2" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-inter-semibold text-white">Take Photo</Text>
              <Text className="text-gray-400 font-inter-regular">
                Capture your profile with camera
              </Text>
            </View>
            <ArrowRight size={20} color="#6BD099" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <ScrollView className="flex-1 bg-dark px-6 pt-20">
      <View className="items-center mb-8">
        <Text className="text-3xl font-inter-bold text-white text-center mb-4">
          Profile Analysis Setup
        </Text>
        <Text className="text-gray-300 font-inter-regular text-center">
          Select your platform and provide details for AI analysis
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-lg font-inter-semibold text-white mb-4">
          Select Platform
        </Text>
        <View className="space-y-3">
          {platforms.map((platform) => (
            <TouchableOpacity
              key={platform.id}
              onPress={() => setSelectedPlatform(platform.id)}
              className={`p-4 rounded-xl border-2 ${
                selectedPlatform === platform.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-600 bg-dark-secondary'
              }`}
            >
              <Text className="text-white font-inter-medium text-center">
                {platform.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {uploadMethod === 'handle' && (
        <View className="mb-8">
          <Text className="text-lg font-inter-semibold text-white mb-4">
            Enter Your Handle
          </Text>
          <TextInput
            value={handle}
            onChangeText={setHandle}
            placeholder="@yourusername"
            placeholderTextColor="#888"
            className="bg-dark-secondary border border-gray-600 rounded-xl p-4 text-white font-inter-regular text-lg"
          />
        </View>
      )}

      <TouchableOpacity
        onPress={handleAnalysis}
        disabled={isAnalyzing}
        className={`p-4 rounded-xl ${
          isAnalyzing ? 'bg-gray-600' : 'bg-primary'
        } items-center justify-center`}
      >
        {isAnalyzing ? (
          <Text className="text-dark font-inter-semibold text-lg">
            Analyzing Profile...
          </Text>
        ) : (
          <View className="flex-row items-center">
            <Sparkles size={20} color="#1a1a1a" className="mr-2" />
            <Text className="text-dark font-inter-semibold text-lg ml-2">
              Start AI Analysis
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );

  return step === 1 ? renderStep1() : renderStep2();
}