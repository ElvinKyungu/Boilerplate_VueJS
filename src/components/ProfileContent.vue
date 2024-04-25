<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import type { UserProfile } from '@/types/user'
  import { getUserProfile, editUserProfile } from '@/lib/api'
  import Swal from 'sweetalert2'

  const userStore = useUserStore()
  const isLoading = ref(false)
  const errorMessage = ref({
    last_name: '',
    first_name: '',
    phone: '',
    email: '',
  })
  const userEdit = ref<UserProfile | null>(null)

  const handleEditProfile = async () => {
    console.log(userEdit.value)
    if(isError.value){
      try {
        if(userEdit.value !== null){
          const result = await editUserProfile(userEdit.value)
          Swal.fire({
            title: 'Success !',
            text: 'Profile changé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          isLoading.value = false
        }
      } catch (error) {
        console.error(error)
        Swal.fire({
          title: 'Erreur !',
          text: 'Une erreur est survenue lors de la mise à jour du profil.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        isLoading.value = false
      }
    }
    else{
      console.log("We can't log you")
    }
  }

  const valideFirstName = () => {
    if(userEdit.value !== null){
      const firstName = userEdit?.value.first_name
      if (
          firstName.length < 3 || 
          firstName.length > 50
        ) {
        errorMessage.value.first_name = 'Le prénom doit avoir entre 3 et 50 caractères'
      } else {
        errorMessage.value.first_name = ''
      }
    }
  }

  const valideLastName = () => {
    if(userEdit.value !== null){
      if (userEdit.value.last_name.length < 3 || userEdit.value.last_name.length > 50) {
        errorMessage.value.last_name = 'Le nom doit avoir entre 3 et 50 caractères'
      } else {
        errorMessage.value.last_name = ''
      }
    }
  }

  const validateEmail = () => {
    if(userEdit.value !== null){
      if (!userEdit.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMessage.value.email = 'Adresse e-mail invalide'
      } else {
        errorMessage.value.email = ''
      }
    }
  }

  const validatePhone = () => {
    if(userEdit.value !== null){
      const phoneNumberLength = userEdit.value.phone_number.length
      if (phoneNumberLength < 10 || phoneNumberLength > 12) {
        errorMessage.value.phone = 'Le numéro de téléphone doit avoir entre 10 et 12 chiffres'
      } else {
        errorMessage.value.phone = ''
      }
    }
  }

  // Computed pour vérifier si les messages d'erreur sont vides
  const isError = computed(() => {
    return Object.values(errorMessage.value).some(message => message !== '')
  })

  onMounted(async () => {
    if (userStore.userID !== null) {
      const userProfileData = await getUserProfile(userStore.userID)
      console.log(userProfileData)
      if ('error' in userProfileData) {
        console.error("Erreur lors de la récupération du profil:", userProfileData.error)
      } else {
        userEdit.value = {
          id: userStore.userID || '',
          first_name: userProfileData.first_name || '',
          last_name: userProfileData.last_name || '',
          email: userProfileData.email || '',
          phone_number: userProfileData.phone_number || '',
        }
      }
    }
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
      <div 
        v-if="userEdit"
        class="flex flex-col gap-3 justify-start w-full">
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
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
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
                placeholder="+243 995 555 480" 
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