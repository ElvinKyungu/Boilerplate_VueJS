<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const errorMessage = ref({
  last_name: '',
  first_name: '',
  phone: '',
  email: '',
})
const userEdit = ref({
  id: '',
  email: '',
  first_name: '',
  phone_number: '',
  last_name: '',
})

const handleEditProfile = async () => {
  console.log(userEdit.value)
  if(isError.value){
    console.log("login")
  }
  else{
    console.log("We can't log you")
  }
}

const valideFirstName = () => {
  if (userEdit.value.first_name.length < 3 || userEdit.value.first_name.length > 50) {
    errorMessage.value.first_name = 'Le prénom doit avoir entre 3 et 50 caractères'
  } else {
    errorMessage.value.first_name = ''
  }
}

const valideLastName = () => {
  if (userEdit.value.last_name.length < 3 || userEdit.value.last_name.length > 50) {
    errorMessage.value.last_name = 'Le nom doit avoir entre 3 et 50 caractères'
  } else {
    errorMessage.value.last_name = ''
  }
}

const validateEmail = () => {
  if (!userEdit.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorMessage.value.email = 'Adresse e-mail invalide'
  } else {
    errorMessage.value.email = ''
  }
}

const validatePhone = () => {
  const phoneNumberLength = userEdit.value.phone_number.length
  if (phoneNumberLength < 10 || phoneNumberLength > 12) {
    errorMessage.value.phone = 'Le numéro de téléphone doit avoir entre 10 et 12 chiffres'
  } else {
    errorMessage.value.phone = ''
  }
}

// Computed pour vérifier si les messages d'erreur sont vides
const isError = computed(() => {
  return Object.values(errorMessage.value).some(message => message !== '')
})
</script>

<template>
  <div 
    class="w-full"
  >
    <div>
      <h1 class="mb-6 text-4xl">Modifier votre profile</h1>
    </div>
    <form
      @submit.prevent
      class="flex justify-start w-full"
    >
      <div class="flex flex-col gap-3 justify-start w-full">
        <p 
          class="text-base font-bold text-slate-700"
        >
          Your last name: 
        </p>
        <div 
          class="flex items-center gap-3 px-2 py-3 rounded border w-full"
          :class="{'border border-red-500': errorMessage.last_name}"
        >
          <div
            class="flex items-center gap-3"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <div class="leading-3">
              <div>
                <input
                  v-model="userEdit.last_name"
                  @blur="valideLastName"
                  @keyup="valideLastName"
                  name="name"  
                  type="text" 
                  class="
                   text-gray-900 text-sm font-bold
                    rounded-lg focus:ring-transparent focus:border-transparent block 
                    w-full outline-none border-none
                  "
                  placeholder="Your last name"
                />
              </div>
            </div>
          </div>
        </div>
        <span
          v-if="errorMessage.last_name"
          class="text-red-500 block" 
        >
          {{ errorMessage.last_name }}
        </span>
        <p 
          class="text-base font-bold text-slate-700"
        >
          Your first name: 
        </p>
        <div
          class="flex items-center gap-3 px-2 py-3 rounded border w-full" 
          :class="{'border border-red-500': errorMessage.first_name}"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <div class="leading-3">
            <div>
              <input
                v-model="userEdit.first_name"
                @blur="valideFirstName"
                @keyup="valideFirstName"
                type="text" 
                class="
                  text-gray-900 text-sm font-bold
                  rounded-lg focus:ring-transparent focus:border-transparent block 
                  w-full outline-none border-none
                "
                placeholder="Your first name" 
              />
            </div>
          </div>
        </div>
        <span class="text-red-500 block" v-if="errorMessage.first_name">
          {{ errorMessage.first_name }}
        </span>
        <p 
          class="text-base font-bold text-slate-700"
        > 
          Your phone number: 
        </p>
        <div 
          :class="{'border border-red-500': errorMessage.phone}"
          class="flex items-center gap-3 px-2 py-3 rounded border w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <div class="leading-3">
            <div>
              <input
                v-model="userEdit.phone_number"
                @blur="validatePhone"
                @keyup="validatePhone"
                type="text" 
                class="
                  text-gray-900 text-sm font-bold
                  rounded-lg focus:ring-transparent focus:border-transparent block 
                  w-full outline-none border-none
                "
                placeholder="Chef marketing officer" 
              />
            </div>
          </div>
        </div>
        <span class="text-red-500 block" v-if="errorMessage.phone">
          {{ errorMessage.phone }}
        </span>
        <p 
          class="text-base font-bold text-slate-700"
        >
          Your mail: 
        </p>
        <div
          :class="{'border border-red-500': errorMessage.email}"
          class="flex items-center gap-3 px-2 py-3 rounded border w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <div class="leading-3">
            <div>
              <input
                v-model="userEdit.email"
                @blur="validateEmail"
                @keyup="validateEmail"
                type="text" 
                class="
                  text-gray-900 text-sm font-bold
                  rounded-lg focus:ring-transparent focus:border-transparent block 
                  w-full outline-none border-none
                "
                placeholder="Mail adress" 
              />
            </div>
          </div>
        </div>
        <span class="text-red-500 block" v-if="errorMessage.email">
          {{ errorMessage.email }}
        </span>
        <div 
          class="flex items-center gap-3 px-2 py-3  rounded justify-end w-full"
        >
          <button
            @click="handleEditProfile"
            type="submit"
            :disabled="isError"
            class="bg-indigo text-white py-3 px-6 font-medium rounded-md"
          >
            <span>Save my profile</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>