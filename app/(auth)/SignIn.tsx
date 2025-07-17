import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function SignIn() {

    const [isSubmitting,setIsSubmitting] = useState(false);
    const [form,setForm] = useState({email:"", password:""});

    const submit=async()=>{
        const {email,password} = form;
        if(!form.email || !form.password){return Alert.alert("Error","Please Enter All Fields");}
        setIsSubmitting(true);

        

        try {
           await signIn({email,password}) 
            router.replace('/')
            console.log("success")
        } catch (error:any) {
            Alert.alert("Error", error.message);
        }
        finally{
            setIsSubmitting(false);
        }

    }
    
  return (
    <View className='flex-1 gap-2 mt-5' >
        <CustomInput placeholder='Enter Your Email' value={form.email} onChangeText={(text)=>setForm((prev=>({...prev,email:text})))} label="Email" keyboardType='email-address'/>
        <CustomInput placeholder='Enter Your Password' value={form.password} onChangeText={(text)=>setForm((prev=>({...prev,password:text})))} label="Password" secureTextEntry={true}/>
        <CustomButton title='Sign In' isLoading={isSubmitting} onPress={submit}/>
        <View className='flex justify-center items-center flex-row gap-2 mt-5'>
            <Text className='base-regular text-gray-100'>Don't Have An Account</Text>
            <Link  className="base-bold text-primary" href="/SignUp">Sign Up</Link>
        </View>
    </View>
  );
}
