<template>
  <q-page class="bg-mainbg" padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordForgot">
      <p class="col-12 text-h5 text-center"> Mot de passe oublié  </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Une adresse email est obligatoire']"
          type ="email"
          rounded
          outlined
          color="black"
          class="text-input-color"
        />



        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Envoyer un email de récupération"
            color="black"
            class="full-width"

            rounded
            type="submit"
          />

          <q-btn
            label="Retourner"
            color="primary"
            class=" q-mt-lg full-width"
            flat
            rounded
            :to ="{name:'login'}"
          />
        </div>


      </div>
    </q-form>


  </q-page>
</template>

<script>
import { defineComponent,ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'



export default defineComponent({
  name: 'PageForgotPassword',
  setup (){
    const {notifyError,notifySuccess} = useNotify()

    const {sendPasswordResetEmail,checkUserExist,emptycheckUserExist} = useAuthUser()
    const email = ref('')
    var EmailAlredyExist = ref(true)

    const handlePasswordForgot = async () => {



      try {
        EmailAlredyExist =true

        await checkUserExist(email.value)

      } catch (error) {

        if (error && error.code == 23503){

          EmailAlredyExist=false


        } else {EmailAlredyExist=true }

      }


      if(EmailAlredyExist == true) {


        try {

          await sendPasswordResetEmail(email.value)

          notifySuccess("Un email de réinitialisation vient d'être envoyé à : " + email.value)

        } catch (error) {

          notifyError(error.message)

        }
        await emptycheckUserExist(email.value)


        }

      else{


        notifyError("compte n'existe pas " )



      }









    }

     return {
      email,
      handlePasswordForgot
    }
  }
})
</script>
