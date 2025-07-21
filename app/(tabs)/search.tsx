import CartButton from '@/components/CartButton'
import Filter from '@/components/Filter'
import MenuCard from '@/components/MenuCard'
import SearchBar from '@/components/SearchBar'
import { getCategories, getMenu } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { MenuItem } from '@/type'
import cn from "clsx"
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const search = () => {
  const { category, query } = useLocalSearchParams<{query: string; category: string}>()
  const router = useRouter();

    const { data, refetch, loading } = useAppwrite({ fn: getMenu, params: { category,  query,  limit: 6, } });
    const { data: categories } = useAppwrite({ fn: getCategories });

    useEffect(() => {
        refetch({ category, query, limit: 6})
    }, [category, query]);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;

                    return (
                        <TouchableOpacity onPress={()=>{router.push({pathname: "/products/[id]",params: { id: `${item.$id}` }})}} className={cn("w-[88%] max-w-fit", "flex-1", !isFirstRightColItem ? "mt-10" : "mt-0")}>
                            
                            <MenuCard item={item as MenuItem} />
                           
                        </TouchableOpacity>
                        
                    )
                }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold text-[13px] uppercase text-primary">Search</Text>
                                <View className="flex-start  flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-bold text-lg text-dark-100">Find your favorite food</Text>
                                </View>
                            </View>
                            <CartButton />
                        </View>

                        <SearchBar/>

                        <Filter categories={categories!} />
                    </View>
                )}
                ListEmptyComponent={() => !loading && <Text className='font-quicksand-bold text-xl text-gray-100'>No results</Text>}
            />
        </SafeAreaView>
    )
}

export default search