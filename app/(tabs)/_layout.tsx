import CustomHeader from '@/components/CustomHeader';
import { images } from '@/constants';
import { useAuthStore } from '@/store/auth.store';
import { TabBarIconProps } from '@/type';
import cn from "clsx";
import { Redirect, Tabs } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TabBarIcon = ({focused, icon ,title}:TabBarIconProps)=>(
  <View className='tab-icon'>
    <Image source={icon} resizeMode="contain" tintColor={focused?'#FE8C00':"#5D5F6D"} className='size-7 text-gray-950'/>
    <Text className={cn('text-[10px] font-quicksand-semibold',focused?"text-primary":"text-gray-200")}>{title}</Text>

  </View>

)


export default function RootLayout() {

  const {isAuthenticated} = useAuthStore()

  if(!isAuthenticated)return <Redirect href="/SignIn"/>
    
  return (
    <Tabs
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      borderRadius: 50,
      marginHorizontal: 20,
      height: 80,
      position: 'absolute',
      bottom: 40,
      backgroundColor: 'white',
      shadowColor: '#1a1a1a',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    tabBarItemStyle: {
      borderRadius: 9999,
    },
    tabBarButton: (props) => (
      <TouchableOpacity
        {...props}
        activeOpacity={0.8} // less than 1 means slight fade, no ripple
      />
    ),
  }}
>
      <Tabs.Screen 
      name='index'
      options={{
        title:"Home",
        tabBarIcon:(({focused})=><TabBarIcon title='Home' icon={images.home} focused={focused}/>)
      }}/>
      <Tabs.Screen 
      name='search'
      options={{
        title:"Search",
        tabBarIcon:(({focused})=><TabBarIcon title='Search' icon={images.search} focused={focused}/>)
      }}/>
      <Tabs.Screen 
      name='cart'
      options={{
        title:"Cart",
        tabBarIcon:(({focused})=><TabBarIcon title='Cart' icon={images.bag} focused={focused}/>)
      }}/>
      <Tabs.Screen 
      name='profile'
      options={{
        title:"Profile",
        tabBarIcon:(({focused})=><TabBarIcon title='Profile' icon={images.person} focused={focused}/>),
        header: ()=> <CustomHeader title='Profile'/>
      }}/>
    </Tabs>
  )
  
}