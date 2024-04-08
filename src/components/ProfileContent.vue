<script setup lang="ts">
  import { useUserStore } from '@/stores/store'
  import { ref, onMounted, defineEmits } from 'vue'
  import { ediUserProfile, getUserProfile } from '@/lib/api'

  const isLoading = ref(false)
  const currentProfilContent = ref('form')
  const emit = defineEmits()
  const userProfile = ref<UserProfile | null>(null)

  onMounted(async () => {
    if (userStore.userID !== null) {
      const userProfileData = await getUserProfile(userStore.userID)
      console.log(userProfileData)
      if ('error' in userProfileData) {
        console.error("Erreur lors de la récupération du profil:", userProfileData.error)
      } else {
        userProfile.value = {
          id: userStore.userID || '',
          first_name: userProfileData.first_name || '',
          last_name: userProfileData.last_name || '',
          role: userProfileData.role || '',
          email: userProfileData.email || '',
          company_id: userProfileData.company_id || null,
        }
      }
    }
  })
</script>

<template>
  <div 
    v-if="currentProfilContent === 'form'"
    class="w-full"
  >
    <form 
      @submit.prevent="handleSubmit(editProfile)" 
      class="flex justify-start w-full"
    >
      <div class="flex flex-col gap-3 justify-start w-full">
        <p 
          :class="{'text-white': isDark}"
          class="text-base font-bold text-slate-700"
        >
          Your last name: 
        </p>
        <div 
          :class="{'dark': isDark}"
          class="flex items-center gap-3 px-2 py-3 rounded border w-full"
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
              :class="{'text-white': isDark}"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <div class="leading-3">
              <div>
                <input
                  name="name" 
                  rules="required" 
                    v-if="userProfile"
                    v-model="userProfile.last_name"
                  type="text" 
                  class="
                   text-gray-900 text-sm font-bold
                    rounded-lg focus:ring-transparent focus:border-transparent block 
                    w-full outline-none border-none
                  "
                  :class="{'dark text-white': isDark}"
                  placeholder="Your last name"
                />
              </div>
            </div>
          </div>
        </div>
        <span 
          class="text-red-500 block" 
          v-if="userProfile?.last_name === ''"
        >
          {{ errors['last_name'] }}
        </span>
        <p 
          :class="{'text-white': isDark}"
          class="text-base font-bold text-slate-700"
        >
          Your first name: 
        </p>
        <div
          :class="{'dark': isDark}"
          class="flex items-center gap-3 px-2 py-3 rounded border w-full" 
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-6 h-6"
            :class="{'text-white': isDark}"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <div class="leading-3">
            <div>
              <input
                v-if="userProfile"
                v-model="userProfile.first_name"
                type="text" 
                class="
                  text-gray-900 text-sm font-bold
                  rounded-lg focus:ring-transparent focus:border-transparent block 
                  w-full outline-none border-none
                "
                :class="{'dark text-white': isDark}"
                placeholder="Your first name" 
                required
              />
            </div>
          </div>
        </div>
        <span class="text-red-500 block" v-if="userProfile?.first_name === ''">
          {{ errors['first_name'] }}
        </span>
        <p 
          :class="{'text-white': isDark}"
          class="text-base font-bold text-slate-700"
        > 
          Your role: 
        </p>
        <div 
          :class="{'text-white dark': isDark}"
          class="flex items-center gap-3 px-2 py-3 rounded border w-full ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <div class="leading-3">
            <div>
              <input
                v-if="userProfile"
                v-model="userProfile.role"
                type="text" 
                class="
                  text-gray-900 text-sm font-bold
                  rounded-lg focus:ring-transparent focus:border-transparent block 
                  w-full outline-none border-none
                "
                :class="{'dark text-white': isDark}"
                placeholder="Chef marketing officer" 
                required 
              />
            </div>
          </div>
        </div>
        <span class="text-red-500 block" v-if="userProfile?.role === ''">
          {{ errors['role'] }}
        </span>
        <p 
          :class="{'text-white': isDark}"
          class="text-base font-bold text-slate-700"
        >
          Your mail: 
        </p>
        <div
          :class="{'text-white dark': isDark}"
          class="flex items-center gap-3 px-2 py-3 rounded border w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <div class="leading-3">
            <div>
              <input
                v-if="userProfile"
                v-model="userProfile.email"
                type="text" 
                class="
                  text-gray-900 text-sm font-bold
                  rounded-lg focus:ring-transparent focus:border-transparent block 
                  w-full outline-none border-none
                "
                :class="{'dark text-white': isDark}"
                placeholder="Mail adress" 
                required
              />
            </div>
          </div>
        </div>
        <span class="text-red-500 block" v-if="userProfile?.email === ''">
          {{ errors['email'] }}
        </span>
        <div 
          class="flex items-center gap-3 px-2 py-3  rounded justify-end w-full"
        >
          <button
            @click="editProfile"
            type="submit"
            class="bg-primary text-white py-3 px-6 font-medium rounded-md"
          >
            <Spinner v-if="isLoading === true"/>
            <span v-else>Save my profile</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>