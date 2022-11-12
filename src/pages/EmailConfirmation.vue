<template>
  <q-page padding class="row justify-center">
    <div>

      <div>
        <p>
          <strong> Merci pour votre inscription ! </strong>
        </p>
      </div>

      <div>
        <p>
          Nous avons envoyé un email à : <strong> {{$route.query.email}} </strong>


        </p>
      </div>

      <div>
        <p>

          Merci de confirmer votre inscription en cliquant sur le lien que contient ce dernier.

        </p>
      </div>





        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-btn
            label="S'identifier"
            color="dark"
            class="full-width"
            rounded
            :to="{name : 'login'}"
          />

      </div>

    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
