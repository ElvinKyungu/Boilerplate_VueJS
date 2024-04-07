// store.ts
import { defineStore } from 'pinia'

interface UserState {
  userID: string | null
  first_name: string | null
  last_name: string | null
  token: string | null
  email: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userID: null,
    first_name: null,
    last_name: null,
    token: null,
    email: null
  }),
  actions: {
    setUserData(
      { userID, first_name, last_name, token, email }: 
      { userID: string, first_name: string, last_name: string, token: string, email:string }
    ): void {
      this.userID = userID
      this.first_name = first_name
      this.last_name = last_name
      this.token = token
      this.email = email
      localStorage.setItem('user', JSON.stringify({ userID, name, token, email }))
    },
    clearUserData(): void {
      this.userID = null
      this.first_name = null
      this.last_name = null
      this.token = null
      this.email = null
      localStorage.removeItem('user')
    },
    restoreUserData(): void {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const { userID, first_name, last_name, token, email } = JSON.parse(storedUser)
        this.userID = userID
        this.first_name = first_name
        this.last_name = last_name
        this.token = token
        this.email = email
      }
    },
  },
  getters: {
    getUserInfo(): { 
      userID: string | null; 
      last_name: string | null;
      first_name: string | null;
      token: string | null, 
      email: string | null 
    } {
      console.log(this.userID, this.first_name, this.token)
      return {
        userID: this.userID,
        last_name: this.last_name,
        first_name: this.first_name,
        token: this.token,
        email: this.email
      }
    },
  },
})