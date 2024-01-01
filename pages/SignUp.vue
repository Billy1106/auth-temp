<template>
  <div>
    <v-card>
      <v-card-title>
        <h1>Sign Up</h1>
      </v-card-title>
      <v-card-text>
        <p>Sign Up page</p>
      </v-card-text>
      <v-text-field v-model="username" label="Username" />
      <v-text-field v-model="password" label="password" />
      <v-btn
        :disabled="loading"
        color="primary"
        @click="() => handleAuthentication()"
      >
        Sign Up
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
const { signUp } = useAuth()

const username = ref('')
const password = ref('')
const loading = ref(false)

const handleAuthentication = async () => {
  loading.value = true
  try {
    await signUp(username.value, password.value)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    loading.value = false
  }
}
</script>
