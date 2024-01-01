<template>
  <div>
    <ClientOnly>
      <v-card>
        <v-card-title>
          <h1>Hello, {{ getUser?.email }}. This is Home page</h1>
        </v-card-title>
        <v-btn
          :disabled="loading"
          color="primary"
          @click="() => handleAuthentication()"
        >
          Logout
        </v-btn>
      </v-card>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
const { signOut, getUser, loading } = useAuth()

const handleAuthentication = async () => {
  try {
    await signOut()
    navigateTo('/login')
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }
}
</script>
