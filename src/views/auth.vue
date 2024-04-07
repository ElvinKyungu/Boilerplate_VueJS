<script lang="ts" setup>
  import SigninWithMagic from '@/components/SigninWithMagic.vue'
  import SigninWithPassword from '@/components/SigninWithPassword.vue'
  import { ref } from 'vue'
  const toggleSignin = ref(false)
  const toggleSigninContent = ()=>{
    toggleSignin.value = !toggleSignin.value
  }
</script>
<template>
  <div class="font-[sans-serif] text-[#333]">
    <div class="grid lg:grid-cols-3 md:grid-cols-2 items-center lg:gap-8 gap-4 h-full">
      <div class="w-full p-6">
        <div class="mb-12 text-center">
          <h3 class="text-3xl font-extrabold">Sign in</h3>
          <p class="text-sm mt-4 ">Don't have an account 
            <button 
              @click="toggleSigninContent"
              class="
                text-blue-600 font-semibold hover:underline ml-1 
                whitespace-nowrap
              "
            >
            {{ toggleSignin ? 'Signin with password' : 'Signin with magic link here' }}
            </button>
          </p>
        </div>
        <div>
          <component :is="toggleSignin ? SigninWithPassword : SigninWithMagic"></component>
        </div>
      </div>
      <div class="max-md:order-1 lg:col-span-2 md:h-screen w-full bg-[#3d348b] md:rounded-tr-xl md:rounded-br-xl lg:p-12 p-8">
      </div>
    </div>
  </div>
</template>
<style>

</style>