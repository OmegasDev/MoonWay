import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const supabaseUrl = 'https://krwkgqfdehqbtcrpgafe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd2tncWZkZWhxYnRjcnBnYWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjYyMjQsImV4cCI6MjA2NTM0MjIyNH0.lK9UfWsTnK7dTwfJ9u-qmb7NDhnSGlhwxUzUetdXAFs';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',  // This is what enables native OAuth flow
  },
});
