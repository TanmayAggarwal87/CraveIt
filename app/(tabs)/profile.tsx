import { images } from '@/constants'
import { deleteSession } from '@/lib/appwrite'
import { useAuthStore } from '@/store/auth.store'
import { router } from 'expo-router'
import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

async function logout (){
  const {setUser,setIsAuthenticated} = useAuthStore.getState()
  const res = await deleteSession() 
  if(!res){
    Alert.alert("Logout Failed","Error in logout")
    console.log("s")
  }

  setUser(null);
  setIsAuthenticated(false);
  router.push("/(auth)/SignIn")
  console.log("success")
}

const profile =  () => {
  const {user} = useAuthStore()

  return (
    <SafeAreaView >

   
      <View className="custom-header my-5 px-5">
          <TouchableOpacity onPress={() => router.back()}>
              <Image
                  source={images.arrowBack}
                  className="size-5"
                  resizeMode="contain"
              />
          </TouchableOpacity>

          {<Text className="base-semibold text-dark-100">Profile</Text>}

          <Image source={images.search} className="size-5" resizeMode="contain" />
      </View>

      <View className='flex justify-center items-center flex-col mt-6'>
        <View className='flex justify-center items-center'>
          <Image source={{ uri: user?.avatar }} className='profile-avatar' resizeMode='contain'></Image>
        </View>
        <View className='flex justify-start items-start w-full mt-10 gap-2 '>
          <View className='profile-field py-2 px-7  justify-center items-center'>
            <View className=''>
              <Image source={images.person} className='profile-field__icon size-10' tintColor="#FE8C00"/>           
            </View>
            <View>
              <View><Text className='font-quicksand-semibold text-md text-gray-100'>Full Name</Text></View>
              <View><Text className='font-quicksand-semibold text-lg'>{user?.name}</Text></View>
            </View>
          </View>

          <View className='profile-field py-2 px-7  justify-center items-center'>
            <View className=''>
              <Image source={images.envelope} className='profile-field__icon size-10' tintColor="#FE8C00" resizeMode='contain'/>           
            </View>
            <View>
              <View><Text className='font-quicksand-semibold text-md text-gray-100'>Email</Text></View>
              <View><Text className='font-quicksand-semibold text-lg'>{user?.email}</Text></View>
            </View>
          </View>

          <View className='profile-field py-2 px-7  justify-center items-center'>
            <View className=''>
              <Image source={images.phone} className='profile-field__icon size-10' tintColor="#FE8C00" resizeMode='contain'/>           
            </View>
            <View>
              <View><Text className='font-quicksand-semibold text-md text-gray-100'>User Id</Text></View>
              <View><Text className='font-quicksand-semibold text-lg'>{user?.$id}</Text></View>
            </View>
          </View>

        </View>
      </View>

    <View className='flex justify-center items-center mt-16'>
      <TouchableOpacity onPress={logout} className='py-4 px-5 bg-red-100 border-2 border-red-500 w-[90%] flex justify-center items-center rounded-xl'>
        
          <Text className='font-quicksand-semibold font-lg'>Logout</Text>
        
      </TouchableOpacity>
    </View>


    </SafeAreaView>
  )
}

export default profile