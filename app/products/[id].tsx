import Customizations from '@/components/Customizations'
import { images } from '@/constants'
import { getItemById } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../../components/CustomHeader'


const StarRating = ({ rating}: { rating: number }) => {
  return (
    <View className="flex-row items-center">
  {[...Array(rating)].map((_, i) => (
    <Image
      key={i}
      source={images.star} // your filled star
      className="w-5 h-5 mr-1"
    />
  ))}
    </View>
  );
};

const Products = () => {
    const {id} = useLocalSearchParams()
  
    const {data:product} = useAppwrite({fn:getItemById,params:{id:id as string}})
    if (!product || !product?.menuCustomizations) {
     return <Text>Loading...</Text>;
      }
    const rawCustomizations = (product?.menuCustomizations ?? []) as any[];

    const customizationList = rawCustomizations.map(item => item.customizations);

    const toppings = customizationList.filter(item => item.type === 'topping');
    const sides = customizationList.filter(item => item.type === 'side');
  return (
    <SafeAreaView className='mt-3 mx-3'>
      <ScrollView showsVerticalScrollIndicator={false}>
      <CustomHeader title = ""/>

      <Text className='font-quicksand-bold text-[25px]'>{product?.name}</Text>

      <View className='flex justify-between items-start flex-row'>
        <View>
          
          <Text className='font-quicksand-semibold mt-1 text-lg text-gray-200'>{product?.categories?.name}</Text>

          <View className='flex justify-start items-center flex-row mt-3'>
            <StarRating rating={Math.round(product?.rating)||0}/>
            <Text className='font-quicksand-semibold text-lg text-gray-200'>{product?.rating}/5</Text>
          </View>

          <View className='flex justify-start items-center flex-row mt-3'>
            <Image source={images.dollar} resizeMode='contain' className='h-11'/>
            <Text className='text-3xl font-quicksand-bold'>{product?.price}</Text>
          </View>

          <View className='flex justify-start items-center flex-row gap-6 mt-6'>
            <View className='flex gap-1'>
              <Text className='text-[16px] font-quicksand-semibold text-gray-200'>Calories</Text>
              <Text className='text-xl font-quicksand-bold'>{product?.calories} Cal</Text>
            </View>

            <View className='flex gap-1'>
              <Text className='text-[16px] font-quicksand-semibold text-gray-200'>Protein</Text>
              <Text className='text-xl font-quicksand-bold'>{product?.protein}g</Text>
            </View>
          </View>
        </View>

        <View>
          <Image source={{uri:product?.image_url}} className='h-[300px] w-[250px] relative -top-10' resizeMode='contain'/>
        </View>

      </View>

      <View className='flex justify-center items-center flex-row gap-12 bg-primary/10 p-1 rounded-lg'>
        <View className='flex justify-start items-center flex-row'>
            <Image source={images.dollar} className='size-7' resizeMode='contain'/>
            <Text className='font-quicksand-bold'>Free Delivery</Text>
        </View>

        <View className='flex justify-start items-center flex-row '>
            <Image source={images.clock} className='size-4 mr-2' resizeMode='contain'/>
            <Text className='font-quicksand-bold'>25 - 30 mins</Text>
        </View>

        <View className='flex justify-start items-center flex-row gap-2 '>
            <Image source={images.star} className='size-6' resizeMode='contain'/>
            <Text className='font-quicksand-bold'>{product?.rating}</Text>
        </View>
      </View>
      
      <View className='mt-7'>
        <Text className='text-xl font-quicksand-medium text-gray-100'>{product?.description}</Text>
      </View>


      <View className='mt-10'>
        {toppings.length > 0 && <Customizations title='Topping' items={toppings} />}
        
      </View>
      <View>
        {sides.length > 0 && <Customizations title='Sides' items={sides} />}
      </View>
      </ScrollView>


      
    </SafeAreaView>
  )
}

export default Products