<template>
  <div>
    <ClientOnly>
      <v-card>
        <v-card-title>
          <h1>Hello, {{ user.email }}. This is main page</h1>
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
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { signOut } = useAuth()
const loading = ref(false)
const user = ref({})

const handleAuthentication = async () => {
  loading.value = true
  try {
    await signOut()
    navigateTo('/login')
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    loading.value = false
  }
}
</script>
