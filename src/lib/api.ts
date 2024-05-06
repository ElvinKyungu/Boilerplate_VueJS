import { supabase } from './supabaseClient'
// import type { UserProfile } from '../types/type'
import { useUserStore } from '../stores/userStore'
import router from '@/router/index'
import type { UserProfile } from '@/types/user'

// console.log(`${import.meta.env.VITE_SITE_URL}/welcome`)  

async function signinWithOtp(email: string): Promise<any> {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: `${import.meta.env.VITE_SITE_URL}welcome`
      }
    })
    if (error) {
      console.error(error)
      return { error }
    }
    router.push('/EmailConfirmation')
    return { data }
  } catch (error) {
    console.log("Une erreur s'est produite ", error)
    return { error }
  }
}

async function signinWithPassword({password, email}: any): Promise<any> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      throw error
    }

    console.log(data)

    if (data) {
      const store = useUserStore()
      const {name, email, lastname} = data.user.user_metadata
      const id = data.user.id
      const token = data.session.access_token

      store.setUserData({
        userID: id,
        first_name: name,
        last_name: lastname,
        access_token: token,
        email: email
      })
      console.log(store.getUserInfo)
      router.push('/')
      return { data: { id, email, name, token } }
    }

    return { data: null }
  } catch (error) {
    throw error
  }
}

const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) {
      console.error(error)
      throw error
    }
    if (!data) {
      console.error("User profile not found.")
      throw error
    }
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const editUserProfile = async (updates: UserProfile): Promise<Boolean> => {
  try {
    const { data, error } = await supabase.from('profiles').upsert(updates)
    if (error) {
      throw error
    }
    console.log(data)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export { 
  signinWithOtp,
  signinWithPassword,
  editUserProfile,
  getUserProfile
}
