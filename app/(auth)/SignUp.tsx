import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { createUser } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function SignUp() {

    const [isSubmitting,setIsSubmitting] = useState(false);
    const [form,setForm] = useState({name:"",email:"", password:""});

    const submit=async()=>{
        const {name,email,password} = form
        if(!name ||!email || !password){return Alert.alert("Error","Please Enter All Fields");}
        setIsSubmitting(true);

        try {
            await createUser({email:email,password:password,name:name})
            router.replace("/")
        } catch (error:any) {
            Alert.alert("Error", error.message);
        }
        finally{
            setIsSubmitting(false);
        }

    }
    
  return (
    <View className='gap-1 flex-1 mt-5' >
        <CustomInput placeholder='Enter Your Name' value={form.name} onChangeText={(text)=>setForm((prev=>({...prev,name:text})))} label="Full Name" />
        <CustomInput placeholder='Enter Your Email' value={form.email} onChangeText={(text)=>setForm((prev=>({...prev,email:text})))} label="Email" keyboardType='email-address'/>
        <CustomInput placeholder='Enter Your Password' value={form.password} onChangeText={(text)=>setForm((prev=>({...prev,password:text})))} label="Password" secureTextEntry={true}/>
        <CustomButton title='Sign Up' isLoading={isSubmitting} onPress={submit}/>
        <View className='flex justify-center items-center flex-row gap-2 mt-5'>
            <Text className='base-regular text-gray-100'>Already Have An Account?</Text>
            <Link  className="base-bold text-primary" href="/SignIn">Sign In</Link>
        </View>
    </View>
  );
}
