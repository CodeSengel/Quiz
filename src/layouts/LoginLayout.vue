<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>


        <q-toolbar-title >
          <span> Quiz </span>

        </q-toolbar-title>


      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import {useQuasar} from 'quasar'



export default defineComponent({
  name: 'MainLayout',



  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const leftDrawerOpen = ref(false)
    const {user , checkUserAdmin,logout} = useAuthUser()

    const handlelogout = async () => {
      console.log('log out')
      $q.dialog({
        title: 'Se déconnecter',
        message: 'Voulez vous vraiement vous déconnecter ?',
        cancel : true,
        persistence: true
      }).onOk(
        async () => {
          await logout()
          router.replace({name:'login'})
        }
      )

    }






    return {

      leftDrawerOpen,
      handlelogout,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
