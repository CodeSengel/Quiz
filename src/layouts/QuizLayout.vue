<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>


        <q-toolbar-title class="row">

          <div class="col-6 text-italic" > {{user.user_metadata.name}} </div>

        </q-toolbar-title>
        <div>
          <q-btn @click="handleRedirectWaiting"  label="Home" icon="mdi-home" />


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

    const handleRedirectWaiting = () => {

const dialog = $q.dialog({
  message: 'Uploading... 0%',
  progress: true, // we enable default settings
  persistent: true, // we want the user to not be able to close it
  ok: false // we want the user to not be able to close it
})

// we simulate some progress here...
let percentage = 0
const interval = setInterval(() => {
  percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

  // we update the dialog
  dialog.update({
    message: `Uploading... ${percentage}%`
  })

  // if we are done, we're gonna close it
  if (percentage === 100) {
    clearInterval(interval)
    setTimeout(() => {
      dialog.hide()
    }, 200)

    router.push({name : 'me'})
  }
}, 250)

}

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
      handleRedirectWaiting,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
