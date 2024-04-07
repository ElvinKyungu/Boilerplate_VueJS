<template>
  <div>
    <!-- Show a loading message or spinner here while processing -->
    Redirecting...
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/userStore'
  // import { createUser } from '../lib/auth'
  const store = useUserStore()

  onMounted(async () => {
    const router = useRouter()

    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    const expiresIn = params.get('expires_in')
    const tokenType = params.get('token_type')
    const expiresAt = params.get('expires_at')

    console.log('accessToken:', accessToken)
    console.log('refreshToken:', refreshToken)
    console.log('expiresIn:', expiresIn)
    console.log('tokenType:', tokenType)
    console.log('expiresAt:', expiresAt)

    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error(error)
    } else {
      console.log('Session:', data)
      if (data.session?.user && accessToken) {
        console.log('User:', data.session.user)
        const { id, email } = data.session.user
        const { name, lastname } = data.session.user.user_metadata
        console.log(id)
        console.log(email)
        if (email) {
          // Create user after signin
          // createUser(id, email)
          store.setUserData({
            userID: id,
            first_name: name,
            last_name: lastname,
            token: accessToken,
            email: email
          })
          router.push({ name: 'Home' })
        }
      } else {
        console.log('No user found in session')
      }
    }
  })
</script>
