import { CreateUserParams, GetMenuParams, SignInParams } from "@/type"
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig={
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:process.env.EXPO_PUBLIC_PLATFORM,
    databaseId:process.env.EXPO_PUBLIC_DATABASE_ID,
    bucketId:process.env.EXPO_PUBLIC_BUCKET_ID,
    userCollectionId:process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
    categoriesCollectionId:process.env.EXPO_PUBLIC_CATEGORIES_COLLECTION_ID,
    menuCollectionId:process.env.EXPO_PUBLIC_MENU_COLLECTION_ID,
    customizationsCollectionId:process.env.EXPO_PUBLIC_CUSTOMIZATIONS_COLLECTION_ID,
    menuCustomizationsCollectionId:process.env.EXPO_PUBLIC_MENU_CUSTOMIZATIONS_COLLECTION_ID,
    addressCollectionId:process.env.EXPO_PUBLIC_ADDRESS_COLLECTION_ID,
}

export const client = new Client()

client
.setEndpoint(appwriteConfig.endpoint!)
.setProject(appwriteConfig.projectId!)
.setPlatform(appwriteConfig.platform!)


export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
const avatars = new Avatars(client)



export const createUser = async ({email,password,name}:CreateUserParams)=>{
    try {
        const newAccount  = await account.create(ID.unique(),email,password, name)

        if(!newAccount){
            throw new Error;
            
        }

        await signIn({email,password})
        const avatarUrl  = avatars.getInitialsURL(name)

        return await databases.createDocument(appwriteConfig.databaseId!,appwriteConfig.userCollectionId!,ID.unique(),{accountId:newAccount.$id,email,name,avatar:avatarUrl})
        
    } catch (error) {
        throw new Error(error as string)
        
    }



}

export const signIn = async ({email,password}:SignInParams)=>{
    try {
        
        const session =await account.createEmailPasswordSession(email,password);

    } catch (error) {
         throw new Error(error as string);
        
    }
}

export const getCurrentUser = async()=>{
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error

        const CurrentUser = await databases.listDocuments(appwriteConfig.databaseId!,appwriteConfig.userCollectionId!,[Query.equal('accountId', currentAccount.$id)])

        if(!CurrentUser) throw Error;

        return CurrentUser.documents[0];
    } catch (error) {
        throw new Error(error as string)
        
    }

}

export const getMenu = async ({category,query}:GetMenuParams)=>{
    try {
        const queries:string[] = [];
        if(category){
            queries.push(Query.equal("categories",category))

        }
        if(query){queries.push(Query.search('name',query))}


        const menus = await databases.listDocuments(appwriteConfig.databaseId!,appwriteConfig.menuCollectionId!,queries)
        return menus.documents
    } catch (error) {
        throw new Error(error as string)
        
    }
}


export const getCategories = async ()=> {
    try {
        const categories = await databases.listDocuments(appwriteConfig.databaseId!,appwriteConfig.categoriesCollectionId!)

        return categories.documents;
    } catch (error) {
        throw new Error(error as string)
        
        
    }
    
}

export const deleteSession = async()=>{
    try {
         return await account.deleteSession('current')
        
    } catch (error) {
        console.log(error)
    }
}

export const getItemById = async ({id}:{id:string})=>{
    try {
        const res = await databases.getDocument(appwriteConfig.databaseId!,appwriteConfig.menuCollectionId!,id)
        return res;
    } catch (error) {
        console.log(error)
    }
}


