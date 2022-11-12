<template>

  <q-page class="justify-center bg-mainbg ">



        <q-table
          class="row"
          grid

          :rows="rows"
          :columns="columnsProduct"
          row-key="name"
          hide-header
          :hide-pagination="true"
          :filter="filter"

        >
        <template  v-slot:top>

           <strong class="text-white"> Mes catégorie </strong>








        </template>

        <template   v-slot:item="props">
          <!--         q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition -->
          <div class="  q-pa-xs col-xs-6 col-sm-6 col-md-4 col-lg-2 grid-style-transition">

            <q-card  style="border-radius: 10%;">

                  <div v-ripple:primary  >


                    <q-img  class="row" @click="handleselectcategorie(props.row.name)" style="border-radius: 10%;" :src="props.row.img_url" :ratio="4/3">
                        <div v-if="props.row.score != null"
                          show-value
                          class=" q-pa-none q-ml-none"

                          >
                          <q-avatar v-if="props.row.score < 100" size="200%">
                            <strong> {{ props.row.score }}% </strong>
                          </q-avatar>

                          <q-avatar v-if="props.row.score == 100" size="200%">
                            <q-icon color="yellow" size="200%" name="mdi-trophy" />
                          </q-avatar>

                        </div>

                        <figcaption class=" col-12 figcap " >
                          <div class="row ">
                            <div class="col-8">
                              <div style="font-size:15px ;">
                                <strong> {{ props.row.name }} </strong>
                              </div>
                            </div>


                          </div>
                        </figcaption>



                    </q-img>
                  </div>

            </q-card>
          </div>
        </template>
      </q-table>








  </q-page>
</template>

<script>
import useAuthUser from 'src/composables/UseAuthUser'
import { defineComponent,ref, onMounted } from 'vue'
import useApi from  'src/composables/UseApi'
import{columnsProduct} from './table'
import {useRouter , useRoute} from 'vue-router'
import useNotify from 'src/composables/UseNotify'



export default defineComponent({
  name: 'PageMe',




  setup (){
    const filter = ref('')
    const router = useRouter()
    const {notifyError, notifySuccess} = useNotify()

    const {user , checkUserAdmin,logout} = useAuthUser()
    const loading = ref(true)
    const {list,post,getById,jsonget,quizlist} = useApi()
    const CategoriesTabName = "quiz_categories_id_names"
    const rows = ref([])
    const score = ref([])
    const test = ref([])
    /*
    ([{name : 'Animeaux', category_id : 1 , img_url:'https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_960_720.jpg'},
                   {name : 'Plantes' , category_id : 2 ,  img_url:'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg'},
                   {name : 'Fruites et légumes', category_id : 3 ,   img_url:'https://cdn.pixabay.com/photo/2015/12/16/03/34/fruit-1095331_960_720.jpg'},
                   {name:'Insectes' , category_id : 4 , img_url:'https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_960_720.jpg'}
                  ])*/
  const handleScore = async (user) => {

    score.value = await getById('quiz_score' ,"playerid",user)


  }
  const handleselejsonget = async (message) => {
    test.value = await jsonget('quiz_score' )
    console.log('voici le test : ' , test.value)
  }

  const handleListCategories = async () => {


      try {
        loading.value = true


        rows.value = await quizlist(user.value.id)
        loading.value = false

      } catch (error) {
        notifyError(error.message)
      }
    }

  const handleselectcategorie =  (message) => {

        try {

          console.log("voici la catégorie : ",message)


          router.push({name : 'quiz',  params : {id: message}})



        } catch (error) {
          notifyError(error.message)

        }
  }




    onMounted(()=> {


      handleListCategories()
      handleScore(user.value.id)
      //handleselejsonget()


    })

    return {
      user,
      columnsProduct,
      rows,
      filter,
      handleselectcategorie,
      score,



    }
  }






})
</script>

<style>
  .figcap{
    background-color: rgb(209, 233, 233,0.7);
    margin-top: 63%;
    padding-left: 10%;

  }



</style>
