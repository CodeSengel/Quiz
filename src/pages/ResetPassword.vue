<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center"> Renseingez un nouveau mot de passe  </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="New password"
          v-model="password"
          type = "password"
          lazy-rules
          :rules="[val=>(val && val.length >= 6) || 'Veuillez renseigner un mot de passe avec 6 caractères au minimum']"

        />




        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Valider"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />


        </div>


      </div>
    </q-form>


  </q-page>
</template>

<script>
  import {defineComponent,ref} from 'vue'
  import useAuthUser from 'src/composables/UseAuthUser';
  import {useRouter, useRoute} from 'vue-router'
  import useNotify from 'src/composables/UseNotify'

  export default defineComponent ({
    name:'PageResetPassword',
    isPwd: ref(true),
    setup () {

      const {resetPassword} = useAuthUser ()
      const router = useRouter()
      const route = useRoute()
      const token = route.query.token

      const password = ref('')

      const {notifyError,notifySuccess} = useNotify()


      const handlePasswordReset = async () => {

        try {

          await resetPassword(token, password.value)
          router.push({name:'login'})
          notifySuccess("Votre mot de passe a bien été modifié")

        } catch (error) {

          notifyError(error.message)

        }



      }

      return {
        password,
        handlePasswordReset
      }


    }
  })
</script>
