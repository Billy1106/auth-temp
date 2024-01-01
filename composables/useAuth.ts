import { navigateTo } from '#app'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { computed } from 'vue'
import type { User } from '~/types'

export function useAuth () {
  const user = useState<User | null>('user', () => null)
  const { $auth } = useNuxtApp()

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const setUserFromUserCredential = (userCredential: any) => {
    setUser({
      idToken: userCredential.user.uid,
      displayName: userCredential.user.displayName || '',
      email: userCredential.user.email || ''
    })
  }

  const getUser = computed(() => {
    return user.value
  })

  const isLoggedIn = computed(() => {
    if (!$auth) { return false }
    return !!user.value
  })

  async function signOut (): Promise<void> {
    await signOutFirebase($auth)
    setUser(null)
  }

  function signUp (email: string, password: string): Promise<void> {
    if ($auth) {
      createUserWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          setUserFromUserCredential(userCredential)
          const redirectTo = useRoute().redirectedFrom?.path || '/home'
          navigateTo(redirectTo, { replace: true })
        })
        .catch((error) => {
          console.error(error) // eslint-disable-line no-console
        })
    }
  }

  function signIn (email: string, password: string): Promise<void> {
    if ($auth) {
      signInWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          setUserFromUserCredential(userCredential)
          const redirectTo = '/home'
          navigateTo(redirectTo, { replace: true })
        })
        .catch((error) => {
          console.error(error) // eslint-disable-line no-console
        })
        .finally(() => {

        })
    }
  }

  async function checkAuth (): Promise<any> {
    return await new Promise((resolve) => {
      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          if (user) {
            user.getIdToken().then((idToken) => {
              const { displayName, email } = user
              setUser({
                idToken,
                displayName: displayName || '',
                email: email || ''
              })
            })
          } else {
            setUser(null)
          }
          resolve(user)
        })
      } else {
        resolve(null)
      }
    })
  }

  return {
    signOut,
    signUp,
    signIn,
    checkAuth,
    getUser,
    isLoggedIn
  }
}
