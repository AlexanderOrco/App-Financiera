<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import LogoIcon from '@/components/LogoIcon.vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify'

const { sm, xs } = useDisplay()
const auth = useAuthStore()
const router = useRouter()
const logout = async () => {
    await auth.logout().then(() => {
        router.push('/login')
    })
}

</script>

<template>
    <v-app-bar color="grey-darken-4">
        <template v-slot:prepend>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn class="ml-2" v-bind="props"> WealthWise </v-btn>
                </template>
                <v-card class="mx-auto" subtitle="Alexander Orco" :title="auth.auth?.currentUser?.email!">
                    <template v-slot:prepend>
                        <LogoIcon :show-text="false" />
                    </template>
                    <v-card-actions>
                        <v-btn class="ml-2" @click="logout"> Cerrar Sesión </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </template>
        <template v-slot:append>
            <div v-if="xs || sm" class="d-flex">
                <v-btn :to="{ name: 'dashboard' }" class="ma-1" icon="mdi-tablet-dashboard"></v-btn>
                <v-btn :to="{ name: 'transactions' }" class="ma-1" icon="mdi-swap-vertical-bold"></v-btn>
                <v-btn :to="{ name: 'savings' }" class="ma-1" icon="mdi-piggy-bank"></v-btn>
                <v-btn :to="{ name: 'budget' }" class="ma-1" icon="mdi-cash-multiple"></v-btn>
            </div>
            <div v-else class="d-flex">
                <v-btn :to="{ name: 'dashboard' }" class="ma-1 text-capitalize"> Panel de Control </v-btn>
                <v-btn :to="{ name: 'transactions' }" class="ma-1 text-capitalize">Transacciones</v-btn>
                <v-btn :to="{ name: 'savings' }" class="ma-1 text-capitalize"> Ahorros </v-btn>
                <v-btn :to="{ name: 'budget' }" class="ma-1 text-capitalize"> Presupuesto </v-btn>
            </div>
        </template>
    </v-app-bar>
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
</template>
