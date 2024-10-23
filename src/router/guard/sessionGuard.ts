import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'
import type { NavigationGuard } from 'vue-router'


export const isAuthenticated: NavigationGuard = async (to, from, next) => {
    try {
        await authenticateUser()
        next()
    } catch (error) {
        console.log(error)
        next({ name: 'login' })
    }
}

function authenticateUser() {
    const auth = useFirebaseAuth()
    return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(auth!, user => {
            unsuscribe()
            if (user) {
                resolve(true)
            } else {
                reject()
            }
        })
    })
}
