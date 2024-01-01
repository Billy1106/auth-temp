<template>
  <div>
    <ClientOnly>
      <v-card>
        <v-card-title>
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <p>Login page</p>
        </v-card-text>
        <v-text-field v-model="username" label="Username" />
        <v-text-field v-model="password" label="password" />
        <v-btn color="primary" @click="() => handleAuthentication()">
          Login
        </v-btn>
        <v-btn color="primary" @click="() => navigateTo('/signup')">
          SignUp page
        </v-btn>
      </v-card>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { signIn } = useAuth()

const username = ref('')
const password = ref('')

const handleAuthentication = async () => {
  try {
    await signIn(username.value, password.value)
    navigateTo('/home')
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }
}
</script>
