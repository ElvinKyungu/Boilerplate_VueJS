<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { signinWithOtp } from '@/lib/api'

  const email = ref('')
  const emailError = ref('')

  const handleEmailBlur = () => {
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailError.value = 'Adresse e-mail invalide'
    } else {
      emailError.value = ''
    }
  }
  const hasErrors = computed(() => {
    return emailError.value !== ''
  })
  const handlSigninWithOtp = async()=>{
    if(!emailError.value){
      const result = await signinWithOtp(email.value)
    }
  }
</script>
<template>
  <form @submit.prevent>
    <div>
      <label class="text-xs block mb-2">Email</label>
      <div class="relative flex items-center">
        <input
          @blur="handleEmailBlur"
          @keyup="handleEmailBlur"
          v-model="email"
          name="email" 
          type="email" 
          required 
          class="
            w-full text-sm border-b border-gray-300 focus:border-[#333] 
            px-2 py-3 outline-none
          "
          :class="{'border-red-500': emailError}"
          placeholder="Enter email" 
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
          <defs>
            <clipPath id="a" clipPathUnits="userSpaceOnUse">
              <path d="M0 512h512V0H0Z" data-original="#000000"></path>
            </clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
            <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
            <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
          </g>
        </svg>
      </div>
      <span class="text-red-500 ml-4 mt-2 block" v-if="emailError !== ''">
        {{ emailError }}
      </span>
    </div>
    <div>
      <div class="mt-12 flex">
        <button
          :class="{ 'opacity-50 cursor-not-allowed': hasErrors }"
          @click="handlSigninWithOtp"
          type="button" 
          class="
            w-full shadow-xl py-3.5 px-4 text-sm font-semibold mx-12
            rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
          "
        >
          Sign in
        </button>
      </div>
    </div>
  </form>
</template>
<style>

</style>