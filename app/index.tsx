import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';

const screenWidth = Dimensions.get('window').width;
const barMaxWidth = 80;

export default function SplashScreen() {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [barAnim] = useState(new Animated.Value(0));
  const [loadingDots, setLoadingDots] = useState('');

  // Handle splash animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(barAnim, { toValue: 1, duration: 3000, useNativeDriver: false }),
    ]).start();

    const dotsInterval = setInterval(() => {
      setLoadingDots(prev => (prev === '...' ? '' : prev + '.'));
    }, 600);

    return () => clearInterval(dotsInterval);
  }, []);

  // Handle navigation AFTER session is ready
  useEffect(() => {
    if (isLoading) return; // Wait until AuthProvider loads session

    const timer = setTimeout(() => {
      if (session?.user) {
        router.replace('/upload');
      } else {
        router.replace('/auth');
      }
    }, 2000); // ✅ Reduced delay for snappier UX

    return () => clearTimeout(timer);
  }, [isLoading, session]);

  const loadingBarWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, barMaxWidth],
  });

  return (
    <View className="flex-1 bg-dark items-center justify-center px-8">
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }} className="items-center">
        <View className="w-32 h-32 mb-8">
          <Image 
            source={require('../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')} 
            className="w-full h-full rounded-3xl" 
            resizeMode="contain" 
          />
        </View>
        <Text className="text-5xl font-inter-bold text-white mb-2">MoonWay</Text>
        <Text className="text-lg font-inter-regular text-gray-300 text-center mb-12">
          AI-Powered Social Media Optimization
        </Text>

        <View className="items-center">
          <View className="w-16 h-1 bg-gray-purple rounded-full mb-4">
            <Animated.View className="h-full bg-primary rounded-full" style={{ width: loadingBarWidth }} />
          </View>
          <Text className="text-gray-400 font-inter-medium">Loading{loadingDots}</Text>
        </View>
      </Animated.View>
    </View>
  );
}


