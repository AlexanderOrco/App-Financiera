import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: useFirebaseAuth(),
    authUser: new Object() as User | null,
    errorMsg: '',
    errorCodes: {
      'auth/invalid-credential': 'Usario o Contraseña erronea',
    },
  }),
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      await signInWithEmailAndPassword(this.auth!, email, password)
        .then(userCredential => {
          const user = userCredential.user
          this.authUser = user
        })
        .catch((error: { code: 'auth/invalid-credential' }) => {
          this.errorMsg = this.errorCodes[error.code]
        })
    },
    async logout() {
      await signOut(this.auth!)
        .then(() => {
          this.authUser = null
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters: {
    hasError: state => {
      return state.errorMsg
    },
    isAuth: state => {
      return state.authUser
    },
  },
})
