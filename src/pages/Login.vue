<template>
  <q-page class="bg-mainbg" padding>
    <q-form class="row justify-center" @submit.prevent="handleLoginWithEmail">
      <p class="col-12 text-h5 text-center text-white"> S'identifier </p>
      <div class=" col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
        label="adresse mail"
          v-model="form.email"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Une adresse email est obligatoire']"
          type ="email"
          rounded
          outlined
          color="black"
          class="text-input-color"


          >

          <template v-slot:prepend>
            <q-icon color="white" size="lg" name="mail" />
          </template>

        </q-input>

        <q-input

          label="Mot de passe"
          v-model="form.password"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Un mot de passe est obligatoire']"
          type ="password"
          autocomplete="on"
          rounded
          outlined
          color="black"
          class="text-input-color"

        >
        <template v-slot:prepend>
          <q-icon color="white" size="lg" name="key" />
        </template>
        </q-input>

        <div class="full-width q-pt-md">
          <q-btn
            label="S'identifier"
            class="full-width "
            color="black"
            rounded
            type="submit"
          />





        </div>
        <div class="full-width q-pt-md q-gutter-y-sm">

          <q-btn
            label="S'inscrire"
            color="white"
            class="full-width"
            flat
            rounded
            to="/register"
          />

          <q-btn
            label="Mot de passe oublié ? "
            color="white"
            class="full-width"
            flat
            :to="{name : 'forgot-password'}"
          />

<!-- Comment
          <q-btn
            label="Google"
            color="primary"


            rounded
            @click="handleLoginWithGoogleAccount"
            :to="'/me'"
          />
-->


        </div>


      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent,ref, onMounted,} from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'





export default defineComponent({
  name: 'PageLogin',


  setup () {

    const router = useRouter()
    const {login , isLoggedIn,loginWithSocialProvider} = useAuthUser()
    const {notifyError,notifySuccess} = useNotify()
    const refresh= ref(false)


    const form = ref({
      email:'',
      password: ''
    })






    onMounted(() => {
      /*
      if (isLoggedIn) {

        router.push({name:'me'})
      }else{console.log("is not logged in")}*/
    })

    const checkEmailExist = ref(false)

    const handleLoginWithEmail = async () => {

        try {

              await login(form.value)

              router.push({name:'me'})
              notifySuccess('Bienvenu !')

            } catch (error) {
              notifyError(error.message)

            }



    }

    const   handleLoginWithGoogleAccount = async () => {

       await loginWithSocialProvider('google')


    }







        /*
        console.log("check1"),
        router.go(router.currentRoute),
        console.log("check2") */



    return {
      form,
      handleLoginWithEmail,
      handleLoginWithGoogleAccount,



    }

  }
})
</script>

<style>
 .text-input-color input {
      color: pink !important;
    }
</style>





