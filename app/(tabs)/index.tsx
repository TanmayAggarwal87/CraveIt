import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import { useAuthStore } from "@/store/auth.store";
import cn from "clsx";
import { useRouter } from "expo-router";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Offer = {
  id: number;
  title: string;
  image: any;
  color: string;
  price: string | "";
  name: string;
};
const handleOfferPress = (offer:Offer) => {
  const router = useRouter()
    // If the offer has a name, navigate with category filter
    if (offer.name) {
      router.push({ 
        pathname: "/(tabs)/search",
        params: { category: offer.name}
      });
    } else {
      // If no name (like SUMMER COMBO), just go to search without filter
      router.push({ pathname: "/(tabs)/search" });
    }
  }

export default function Index() {
  const {user} = useAuthStore()
  const router = useRouter()
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className=" flex flex-between flex-row w-full my-5 px-5">
        <View >
          <Text className="text-primary font-quicksand-semibold text-[14px]">Deliver To</Text>
          <TouchableOpacity className="flex justify-between items-center flex-row">
            <Text className="text-[15px] paragraph-bold">Rijeka,Croatia</Text>
            <Image source={images.arrowDown} className="size-3 ml-2" resizeMode="contain"/>
          </TouchableOpacity>
          
        </View>
        <View>
          <CartButton/>
        </View>

      </View>
      <View>
        <FlatList
         data={offers}
         contentContainerClassName="pb-28 px-1"
         renderItem={({item,index})=>{
          const isEven = index%2===0;
          return(
            <View >
              <Pressable className={'offer-card'} style={{ backgroundColor: item.color }} android_ripple={{color:"#fffff22"}} onPress={() => {handleOfferPress(item)}}>
                {({pressed})=>(
                  <Fragment>
                    <View className={cn("w-screen flex justify-between items-center pt-2 ",isEven ? "flex-row":"flex-row-reverse")}>
                      <View className={cn(isEven?"ml-2":"mr-2")}>
                        <Text className="font-quicksand-bold text-4xl text-white break-all max-w-[180px]">
                          {item.title}
                        </Text>
                        <Text className="font-quicksand-bold text-3xl mt-2  text-white">
                          {item.price}
                        </Text>
                        <Image source={images.arrowRight} className="size-10 mt-2" resizeMode="contain" tintColor="#ffffff"/>
                      </View>
                      <View className={"h-full w-3/2 mt-2"}><Image source={item.image} style={{ width: 200, height: 150 }}/></View>
                  
                  
                    </View>
                  </Fragment>
                )}
                
              </Pressable>
              

            </View>
          )
         }}/>
        
      </View>
    </SafeAreaView>
    
  );
}
