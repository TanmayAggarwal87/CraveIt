import { CreateUserParams, GetMenuParams, SignInParams } from "@/type"
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig={
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:"com.craveit.foodordering",
    databaseId:"6875ff7c00152890caf1",
    bucketId:"6878dab6001cdaa342b6",
    userCollectionId:"6875ff9d0006120c3477",
    categoriesCollectionId:"6878d2ab0000c40e62d2",
    menuCollectionId:"6878d375000dae9f6c9a",
    customizationsCollectionId:"6878d6e8000c297bf71d",
    menuCustomizationsCollectionId:"6878d9d60029eb2e1d64"
}

export const client = new Client()

client
.setEndpoint(appwriteConfig.endpoint!)
.setProject(appwriteConfig.projectId!)
.setPlatform(appwriteConfig.platform)


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

        return await databases.createDocument(appwriteConfig.databaseId,appwriteConfig.userCollectionId,ID.unique(),{accountId:newAccount.$id,email,name,avatar:avatarUrl})
        
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

        const CurrentUser = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.userCollectionId,[Query.equal('accountId', currentAccount.$id)])

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


        const menus = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.menuCollectionId,queries)
        return menus.documents
    } catch (error) {
        throw new Error(error as string)
        
    }
}


export const getCategories = async ()=> {
    try {
        const categories = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.categoriesCollectionId)

        return categories.documents;
    } catch (error) {
        throw new Error(error as string)
        
        
    }
    
}


