<template>
  <q-page class="bg-mainbg"  padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center"> S'inscrire </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Nom"
          v-model="form.name"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Un nom est obligatoire']"
          rounded
          outlined
          color="black"
          class="text-input-color"
        />

        <q-input
          label="Email"
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
          :rules="[val=>(val && val.length >= 6) || 'Un mot de passe est obligatoire avec 6 caractères au minimum']"
          type = "password"
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

        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn
            label="S'inscrire"
            color="black"
            class="full-width"

            rounded
            type="submit"
          />
          <q-btn
            label="Retourner"
            class="full-width"
            color="primary"
            flat
            :to="{name:'login'}"
          />
        </div>


      </div>
    </q-form>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser';
import {useRouter} from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageRegister',
  setup (){
    const {notifyError,notifySuccess} = useNotify()
    const router = useRouter()
    const {register,checkUserExist, emptycheckUserExist} = useAuthUser()

    const form = ref({
      name:'',
      email:'',
      password:''
    })

    var EmailAlredyExist = ref(false)







    const handleRegister = async () => {

      try {
        await checkUserExist(form.value.email)
      } catch (error) {
        if (error && error.code == 23503){
          EmailAlredyExist=false
        } else {EmailAlredyExist=true}
      }

      if(EmailAlredyExist) {
        notifyError("Vous avez déjà créé un compte"),
        await emptycheckUserExist(form.value.email)
      }

      else{
        try {
          await register(form.value)
          router.push({
            name:'email-confirmation',
            query :{email: form.value.email}
          })
          }
          catch (error) {
              notifyError(error.message)
                          }
      }










    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
