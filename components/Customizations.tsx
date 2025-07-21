// MenuCardList.tsx
import { images } from '@/constants';
import { MenuItem } from '@/type';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';

type CustomizationsProps = {
  title: string;
  items: MenuItem[];
}

const Customizations = ({ title, items }: CustomizationsProps) => {
  return (
    <View className="mb-4">
      <Text className="text-xl font-quicksand-bold mb-4">{title}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.$id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-3"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-black w-[160px] h-[168px] rounded-xl  items-center"
            style={Platform.OS === 'android' ? { elevation: 4, shadowColor: '#000' } : {}}
            onPress={()=>console.log(item.name)}
          >
            <Image source={{uri:item.image_url}} className="w-full bg-white h-28 mb-2 rounded-xl" resizeMode='cover' />
            

                <View className='flex justify-center items-center flex-row gap-2 mt-4'>
                    <Text className=" text-white text-[14px] font-quicksand-semibold">{item.name}</Text>
                    <Image source={images.plus} className='size-4 '/>
                </View>
                
           
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Customizations;
