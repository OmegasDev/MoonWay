import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, Crown, Smartphone, Moon, Upload, ArrowLeft } from 'lucide-react-native';

const SettingItem = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  onPress, 
  showChevron = true,
  rightElement 
}: {
  title: string;
  subtitle?: string;
  icon: any;
  onPress: () => void;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-dark-secondary p-4 rounded-xl border border-gray-purple mb-3 active:bg-dark-tertiary"
  >
    <View className="flex-row items-center">
      <View className="w-10 h-10 bg-primary/20 rounded-lg items-center justify-center mr-4">
        <Icon size={20} color="#6ec3ec" />
      </View>
      
      <View className="flex-1">
        <Text className="text-white font-inter-semibold">{title}</Text>
        {subtitle && (
          <Text className="text-gray-400 font-inter-regular text-sm">{subtitle}</Text>
        )}
      </View>
      
      {rightElement || (showChevron && (
        <ChevronRight size={20} color="#718096" />
      ))}
    </View>
  </TouchableOpacity>
);

const PricingCard = ({ 
  title, 
  price, 
  features, 
  isPopular = false,
  isCurrentPlan = false,
  onSelect 
}: {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  onSelect: () => void;
}) => (
  <View className={`p-6 rounded-2xl border-2 mb-4 ${
    isPopular 
      ? 'border-primary bg-primary/5' 
      : 'border-gray-purple bg-dark-secondary'
  }`}>
    {isPopular && (
      <View className="bg-primary px-3 py-1 rounded-full self-start mb-3">
        <Text className="text-dark font-inter-semibold text-sm">Most Popular</Text>
      </View>
    )}
    
    <View className="flex-row items-center mb-2">
      <Text className="text-2xl font-inter-bold text-white">{title}</Text>
      {title === 'Pro+' && <Crown size={20} color="#6ec3ec" className="ml-2" />}
    </View>
    
    <Text className="text-3xl font-inter-bold text-primary mb-4">
      {price}
      <Text className="text-lg text-gray-400 font-inter-regular">/month</Text>
    </Text>
    
    <View className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <Text key={index} className="text-gray-300 font-inter-regular">
          • {feature}
        </Text>
      ))}
    </View>
    
    <TouchableOpacity
      onPress={onSelect}
      className={`p-4 rounded-xl ${
        isCurrentPlan 
          ? 'bg-gray-600' 
          : isPopular 
            ? 'bg-primary' 
            : 'border border-primary bg-transparent'
      } items-center`}
    >
      <Text className={`font-inter-semibold ${
        isCurrentPlan 
          ? 'text-gray-300' 
          : isPopular 
            ? 'text-dark' 
            : 'text-primary'
      }`}>
        {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
      </Text>
    </TouchableOpacity>
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showPricing, setShowPricing] = useState(false);

  const pricingPlans = [
    {
      title: 'Free',
      price: '$0',
      features: [
        'Basic profile analysis',
        'Limited viral hooks',
        'Weekly progress tracking',
        'Community support'
      ],
      isCurrentPlan: true
    },
    {
      title: 'Pro',
      price: '$9.99',
      features: [
        'Advanced AI analysis',
        'Unlimited viral hooks',
        'Content calendar',
        'Competitor insights',
        'Priority support'
      ],
      isPopular: true
    },
    {
      title: 'Pro+',
      price: '$19.99',
      features: [
        'Everything in Pro',
        'White-label reports',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Dedicated manager'
      ]
    }
  ];

  if (showPricing) {
    return (
      <ScrollView className="flex-1 bg-dark px-6 pt-16">
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={() => setShowPricing(false)}
            className="mr-4 w-10 h-10 bg-dark-secondary rounded-full items-center justify-center"
          >
            <ArrowLeft size={20} color="#6ec3ec" />
          </TouchableOpacity>
          <Text className="text-3xl font-inter-bold text-white">
            Choose Your Plan
          </Text>
        </View>
        
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            {...plan}
            onSelect={() => console.log(`Selected ${plan.title}`)}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-dark px-6 pt-16">
      <View className="flex-row items-center mb-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 w-10 h-10 bg-dark-secondary rounded-full items-center justify-center"
        >
          <ArrowLeft size={20} color="#6ec3ec" />
        </TouchableOpacity>
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className="w-10 h-10 mr-3">
              <Image 
                source={require('../../assets/images/Leonardo_Phoenix_10_Create_a_captivating_brand_logo_for_a_soci_3.jpg')}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
            </View>
            <Text className="text-3xl font-inter-bold text-white">
              Settings
            </Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View className="mb-8">
        <Text className="text-lg font-inter-semibold text-white mb-4">
          Account
        </Text>
        
        <SettingItem
          title="Profile Settings"
          subtitle="Update your personal information"
          icon={User}
          onPress={() => {}}
        />
        
        <SettingItem
  title="Profile Analysis"
  subtitle="Upload screenshot or enter URL for analysis"
  icon={Upload}
  onPress={() => router.push('/(tabs)/upload')}
  rightElement={
    <View className="bg-secondary/20 px-2 py-1 rounded-full">
      <Text className="text-secondary font-inter-semibold text-xs">Analyze</Text>
    </View>
  }
/>

        
        <SettingItem
          title="Subscription"
          subtitle="Free Plan • Upgrade to unlock more features"
          icon={CreditCard}
          onPress={() => setShowPricing(true)}
          rightElement={
            <View className="bg-primary px-2 py-1 rounded-full">
              <Text className="text-dark font-inter-semibold text-xs">Upgrade</Text>
            </View>
          }
        />
      </View>

      {/* Preferences Section */}
      <View className="mb-8">
        <Text className="text-lg font-inter-semibold text-white mb-4">
          Preferences
        </Text>
        
        <SettingItem
          title="Notifications"
          subtitle="Push notifications and alerts"
          icon={Bell}
          onPress={() => {}}
          showChevron={false}
          rightElement={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#463e69', true: '#6ec3ec' }}
              thumbColor={notifications ? '#231c3c' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          title="Dark Mode"
          subtitle="Switch between light and dark themes"
          icon={Moon}
          onPress={() => {}}
          showChevron={false}
          rightElement={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#463e69', true: '#6ec3ec' }}
              thumbColor={darkMode ? '#231c3c' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          title="App Preferences"
          subtitle="Language, region, and more"
          icon={Smartphone}
          onPress={() => {}}
        />
      </View>

      {/* Support Section */}
      <View className="mb-8">
        <Text className="text-lg font-inter-semibold text-white mb-4">
          Support
        </Text>
        
        <SettingItem
          title="Privacy Policy"
          subtitle="How we protect your data"
          icon={Shield}
          onPress={() => {}}
        />
        
        <SettingItem
          title="Help & Support"
          subtitle="Get help or contact us"
          icon={HelpCircle}
          onPress={() => {}}
        />
      </View>

      {/* Danger Zone */}
      <View className="mb-8">
        <SettingItem
          title="Sign Out"
          subtitle="Sign out of your account"
          icon={LogOut}
          onPress={() => router.replace('/auth')}
          showChevron={false}
        />
      </View>
    </ScrollView>
  );
}