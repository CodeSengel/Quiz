<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>


        <q-toolbar-title class="row">

          <div class="col-6 text-italic" > {{user.user_metadata.name}} </div>
          <div class="col-3">

          </div>
        </q-toolbar-title>
        <div>
          <q-btn @click="handlelogout" label="Quiter" icon="mdi-logout" />


        </div>

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

      user,
      leftDrawerOpen,
      handlelogout,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
