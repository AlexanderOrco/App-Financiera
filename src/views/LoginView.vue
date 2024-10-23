<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router';
import LogoIcon from '@/components/LogoIcon.vue';

const auth = useAuthStore()
const recoverySession = () => {
  onAuthStateChanged(auth.auth!, user => {
    if (user) {
      auth.authUser = user
    }
  })
}

recoverySession()
const { handleSubmit } = useForm<{ email: string; password: string }>({
  validationSchema,
})
const email = useField('email')
const password = useField('password')
const router = useRouter()
const submit = handleSubmit(async values => {
  console.log(values)
  await auth.login(values).then(() => {
    router.push('/dashboard')
  })
})
</script>

<template>
  <v-card color="white" width="300" height="auto" class="align-self-center">
    <v-card-title class="pa-2">
      <LogoIcon />
    </v-card-title>
    <v-card-actions>
      <v-form class="d-flex flex-column pa-4 w-100 ga-2 ">
        <v-text-field type="email" label="Email" variant="outlined" density="compact" prepend-inner-icon="mdi-email"
          base-color="primary" color="primary" v-model="email.value.value" @keyup.enter="submit"
          :error-messages="email.errorMessage.value" />
        <v-text-field type="password" label="Password" variant="outlined" density="compact"
          prepend-inner-icon="mdi-lock" base-color="primary" color="primary" v-model="password.value.value"
          @keyup.enter="submit" :error-messages="password.errorMessage.value" />
        <v-btn variant="tonal" block class="text-capitalize" base-color="primary" @click="submit">Iniciar Sesión</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>
