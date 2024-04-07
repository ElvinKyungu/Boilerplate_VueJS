<script lang="ts" setup>
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient';
// import Spinner from '../components/Spinner.vue'

// const disableButton = ref(false)
const isSubmited = ref(false)
const showPassword = ref(false)
const userSignupData = ref({
  email: '',
  password: '',
})

const errors = ref({
  invalidEmail: '',
  invalidPassword:''
})

const handleSignup = async() => {
  if (isFormValid.value) {
    isSubmited.value = !isSubmited.value
    try{
      const { data, error } = await supabase.auth.signUp({
        email: userSignupData.value.email,
        password: userSignupData.value.password,
        options: {
          data: {
            first_name: 'Elvin',
            last_name: 'Kyungu',
          },
        },
      })
      if(error){
        console.log(error)
        return {error}
      }
      console.log(data)
    }catch(error){
      console.log(error)
    }
  } else {
    console.log('Veuillez remplir tous les champs correctement.')
  }
}

const isFormValid = computed(() => {
  return (
    userSignupData.value.email !== '' &&
    userSignupData.value.password !== '' &&
    errors.value.invalidEmail === '' &&
    errors.value.invalidPassword === ''
  )
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userSignupData.value.email)) {
    errors.value.invalidEmail = 'Invalid e-mail address'
  } else {
    errors.value.invalidEmail = ''
  }
}
const validatePassword = ()=>{
  errors.value.invalidPassword = userSignupData.value.password.length > 5 ? '' : 'Invalid password'
}

const togglePasswordVisibility = ()=>{
  showPassword.value = !showPassword.value
}

</script>
<template>
  <form @submit.prevent="" autocomplete="off" class="h-screen bg-indigo-500/15 flex items-center">
    <div class="max-w-xl m-auto flex items-center flex-col bg-white justify-center p-10 rounded-lg">
      <div class="mt-8 ">
        <div class="flex gap-4  relative mt-4">
          <div class="relative w-full">
            <div class="text-lg font-bold text-gray-700 tracking-wide ml-4 mb-2">Your mail adress</div>
            <div 
              class="
                flex items-center
                 text-lg font-bold py-4 rounded-full bg-[#f6f6f6]
                focus:border-indigo-500 px-5 gap-4 border border-gray-300 
              "
              :class="{ 'border-red-500': errors.invalidEmail !== '' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <input 
                class="
                focus:outline-none bg-[#f6f6f6] w-full
                " 
                type="email" 
                placeholder="johndoe@gmail.com"
                v-model="userSignupData.email"
                @blur="validateEmail"
                @keyup="validateEmail"
              >
            </div>
            <span class="text-red-500 ml-4 mt-2 block" v-if="errors.invalidEmail !== ''">
              {{ errors.invalidEmail }}
            </span>
          </div>
        </div>
        <div class="mt-6">
          <div class="text-lg font-bold text-gray-700 tracking-wide ml-4 mb-2">Your password</div>
          <div 
            class="
              flex items-center
              text-lg font-bold py-4 rounded-full bg-[#f6f6f6]
              focus:border-indigo-500 px-5 gap-4 border border-gray-300 
            "
            :class="{ 'border-red-500': errors.invalidPassword !== '' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input 
              class="
              focus:outline-none bg-[#f6f6f6] w-full
              " 
              :type="showPassword ? 'text' : 'password'"  
              placeholder="Your password"
              v-model="userSignupData.password"
              @keyup="validatePassword"
              @blur="validatePassword"
            >
            <div @click="togglePasswordVisibility" class="cursor-pointer">
              <svg 
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <svg 
                v-else
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 "
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </div>
          </div>
          <span class="text-red-500 ml-4 mt-2 block" v-if="errors.invalidPassword !== ''">
            {{ errors.invalidPassword }}
          </span>
        </div>
      </div>
      <div class="mt-10 flex gap-10">
        <button 
          @click="handleSignup"
          class="
          bg-[#388087]  text-gray-100 py-4 px-8 w-full flex justify-center rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline 
             shadow-lg
          "
        > 
        <span>Signup </span>
        </button>
      </div>
    </div>
  </form>
</template>
<style>

</style>