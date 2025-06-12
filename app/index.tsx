import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate loading dots
    const dotsInterval = setInterval(() => {
      setLoadingDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    // Simulate loading and check auth status
    const timer = setTimeout(() => {
      clearInterval(dotsInterval);
      
      // Simulate checking if user is logged in
      const isLoggedIn = false; // This would come from your auth state
      
      if (isLoggedIn) {
        router.replace('/upload');
      } else {
        router.replace('/auth');
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <View className="flex-1 bg-dark items-center justify-center px-8">
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
        className="items-center"
      >
        {/* Logo */}
        <View className="w-32 h-32 mb-8">
          <Image 
            source={require('../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')}
            className="w-full h-full rounded-3xl"
            resizeMode="contain"
          />
        </View>

        {/* App Name */}
        <Text className="text-5xl font-inter-bold text-white mb-2">
          MoonWay
        </Text>
        
        <Text className="text-lg font-inter-regular text-gray-300 text-center mb-12">
          AI-Powered Social Media Optimization
        </Text>

        {/* Loading Animation */}
        <View className="items-center">
          <View className="w-16 h-1 bg-gray-purple rounded-full mb-4">
            <Animated.View 
              className="h-full bg-primary rounded-full"
              style={{
                width: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }}
            />
          </View>
          <Text className="text-gray-400 font-inter-medium">
            Loading{loadingDots}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}