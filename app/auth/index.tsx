import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.replace('/(tabs)/upload');  // <-- updated path here
      }
    };
    checkSession();
  }, []);

  const handleGuestAccess = () => {
    router.replace('/(tabs)/upload');  // <-- updated path here
  };

  const handleEmailAuth = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            Alert.alert(
              'Account Not Found',
              'No account exists for this email. Would you like to create a new account?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Up', onPress: () => setIsLogin(false) }
              ]
            );
            return;
          } else {
            throw error;
          }
        }

        router.replace('/(tabs)/upload');  // <-- updated path here
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        await supabase.from('profiles').insert({
          id: user?.id || '',
          full_name: formData.name,
          email: formData.email,
          created_at: new Date().toISOString()
        });

        router.replace('/(tabs)/upload');  // <-- updated path here
      }
    } catch (err) {
      Alert.alert('Auth error', err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-dark">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-20 pb-8">
          <View className="items-center mb-12">
            <View className="w-24 h-24 mb-6">
              <Image source={require('../../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')} className="w-full h-full rounded-2xl" resizeMode="contain" />
            </View>
            <Text className="text-4xl font-inter-bold text-white text-center mb-3">MoonWay</Text>
            <Text className="text-lg font-inter-regular text-gray-300 text-center">
              {isLogin ? 'Welcome!' : 'Join the journey'}
            </Text>
          </View>

          <TouchableOpacity onPress={handleGuestAccess} className="bg-white p-4 rounded-xl items-center justify-center mb-6 flex-row">
            <Text className="text-dark font-inter-semibold text-lg">
              Continue as Guest
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-purple" />
            <Text className="text-gray-400 font-inter-regular mx-4">or</Text>
            <View className="flex-1 h-px bg-gray-purple" />
          </View>

          <View className="space-y-6">
            {!isLogin && (
              <View>
                <Text className="text-white font-inter-medium mb-2">Full Name</Text>
                <View className="relative">
                  <TextInput value={formData.name} onChangeText={(text) => setFormData({ ...formData, name: text })} placeholder="Enter your full name" placeholderTextColor="#718096" className="bg-dark-secondary border border-gray-purple rounded-xl p-4 pl-12 text-white font-inter-regular" />
                  <User size={20} color="#718096" className="absolute left-4 top-4" />
                </View>
              </View>
            )}

            <View>
              <Text className="text-white font-inter-medium mb-2">Email</Text>
              <View className="relative">
                <TextInput value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })} placeholder="Enter your email" placeholderTextColor="#718096" keyboardType="email-address" autoCapitalize="none" className="bg-dark-secondary border border-gray-purple rounded-xl p-4 pl-12 text-white font-inter-regular" />
                <Mail size={20} color="#718096" className="absolute left-4 top-4" />
              </View>
            </View>

            <View>
              <Text className="text-white font-inter-medium mb-2">Password</Text>
              <View className="relative">
                <TextInput value={formData.password} onChangeText={(text) => setFormData({ ...formData, password: text })} placeholder="Enter your password" placeholderTextColor="#718096" secureTextEntry={!showPassword} className="bg-dark-secondary border border-gray-purple rounded-xl p-4 pl-12 pr-12 text-white font-inter-regular" />
                <Lock size={20} color="#718096" className="absolute left-4 top-4" />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 top-4">
                  {showPassword ? <EyeOff size={20} color="#718096" /> : <Eye size={20} color="#718096" />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleEmailAuth} disabled={isLoading} className={`p-4 rounded-xl ${isLoading ? 'bg-gray-600' : 'bg-primary'} items-center justify-center mt-6`}>
              <Text className="text-dark font-inter-semibold text-lg">
                {isLoading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-gray-400 font-inter-regular">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text className="text-primary font-inter-semibold">
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


