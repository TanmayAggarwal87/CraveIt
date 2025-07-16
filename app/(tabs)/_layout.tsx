import { useAuthStore } from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';

export default function RootLayout() {

  const {isAuthenticated} = useAuthStore()

  if(!isAuthenticated)return <Redirect href="/SignIn"/>
    
  return <Slot />
  
}