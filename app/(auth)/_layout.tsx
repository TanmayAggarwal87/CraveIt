import { images } from '@/constants';
import { useAuthStore } from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _Layout() {

  const {isAuthenticated} = useAuthStore();

  if(isAuthenticated) return <Redirect href="/"/>
  return (
    <KeyboardAvoidingView behavior={Platform.OS=='ios'?"padding":"height"}>
      <ScrollView className='bg-white h-full ' keyboardShouldPersistTaps="handled">
        <SafeAreaView style={{ flex: 1 }}>
          <View className='w-full relative ' style={{height:Dimensions.get("screen").height/2.25}}>
          <ImageBackground source={images.loginGraphic} className='size-full roundef-b-lg' resizeMode='stretch'/>
          <Image source={images.logo} className='self-center size-48 absolute -bottom-16 z-10' />
          


          </View>
      
         <Slot />
        </SafeAreaView>
        

      </ScrollView>

    </KeyboardAvoidingView>
    
  );
}
