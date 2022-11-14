<template>

  <q-page class=" page q-pt-xs" style="overflow:hidden ;">




    <q-card  class="   mycard q-mx-xs "  style=" height: 58vh" >

      <q-card-section class="justify-center row " style="height : 100% ; width:100% ;"  v-touch-swipe.mouse.right="handleSwipeRight" v-touch-swipe.mouse.left="handleSwipeLeft"  >

        <q-img class="myphoto row col-12" :src="imgurl"/>



      </q-card-section>

      <q-card-section class="justify-center row  " style="height: 30vh;">

        <div v-if="answerclicked" class=" justify-center q-gutter-lg col-12 row  ">
          <q-btn v-if="!first" color="green" :label=  "propositions.prop1" class="col-5" @click="handkeCheckAnswer(propositions.prop1)" />
          <q-btn v-if="!first" color="red" :label= "propositions.prop2" class="col-5" @click="handkeCheckAnswer(propositions.prop2)"/>
        </div>
        <div v-if="answerclicked" class=" q-mt-md justify-center q-gutter-lg col-12 row ">
          <q-btn  v-if="!first" color="indigo" :label= "propositions.prop3" class="col-5" @click="handkeCheckAnswer(propositions.prop3)"/>
          <q-btn  v-if="!first" color="purple" :label= "propositions.prop4" class="col-5" @click="handkeCheckAnswer(propositions.prop4)"/>
        </div>

        <div class="justify-center row">
          <q-btn class=" glossy" round  v-if="first" size = "300%" color="red" label="GO" @click="handleimg()" />
        </div>

      </q-card-section>




    </q-card>









    <q-footer class="myfooter"  style="height: 5%;">
      <q-toolbar v-if="!$q.platform.is.mobile" class="q-gutter-x-xs justify-center ">

          <q-btn color="green" @click="handleimg(0)" label="previous" class="mybutton col-5"/>
          <q-btn color="indigo" @click="handleimg(1)" label="next" class="mybutton col-5"/>

      </q-toolbar>
    </q-footer>

  </q-page>

</template>

<script>
import { defineComponent,onMounted,onUpdated,ref,computed} from 'vue'
import TweenMax from 'gsap'
import {useRouter , useRoute} from 'vue-router'
import useApi from  'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import {useQuasar} from 'quasar'
import useAuthUser from 'src/composables/UseAuthUser'


export default defineComponent({
  name: 'IndexPage',


  setup(){
    const {user } = useAuthUser()
    const {list,post,quizcheckifuserexist,quizcheckanswer} = useApi()
    const router = useRouter()
    const route = useRoute()
    const category = computed (() => route.params.id)
    const tabname = "quiz_category_"+category.value
    const {notifyError, notifySuccess,notifyAnswer,notifyWelcome} = useNotify()
    const loading = ref(true)
    const $q = useQuasar()
    const startthegame = ref(false)
    const answercorrect = ref(null)
    const answerclicked = ref(false)
    const rows = ref([])




    const display = ref(false)
    const imgurl= ref('')
    const first = ref(false)
    const id = ref(0)
    const animationx = ref('')

    const propositions = ref([])


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
          message: `... ${percentage}%`
        })

        // if we are done, we're gonna close it
        if (percentage === 100) {
          clearInterval(interval)
          setTimeout(() => {
            dialog.hide()
          }, 350)

          router.push({name : 'me'})
        }
      }, 500)

    }

    const handleDisplayPopup =  (message) => {

      if (message) {
        notifyAnswer('positive','icon',500,'True')


      }else {notifyAnswer('negative','icon',500,'False')}

      setTimeout(() => handleimg(1), 1000)

    }
    const handleCheckIfUserExist = async (userid, categ) => {
      startthegame.value = await quizcheckifuserexist(userid ,categ )
    }

    const handkeCheckAnswer = async(answer)=> {
      answercorrect.value = await  quizcheckanswer(user.value.id,category.value,id.value,answer)
        // await handleDisplayPopup()

        .then((res) => handleDisplayPopup(res))


    }



   const handleListProposition = async () => {


    try {
        loading.value = true
        rows.value = await list(tabname ,"id")

        loading.value = false

      } catch (error) {
        notifyError(error.message)
      }
    }



    onMounted(()=> {

      notifyWelcome(category.value, 2000)
      handleCheckIfUserExist(user.value.id,category.value ).then((res) => handleListProposition())




      first.value = true
      if(!$q.platform.is.mobile){
        TweenMax.from(".mybutton",{duration:3,rotation:180})
        TweenMax.from(".mybutton",{duration:2,y:'-100vh', ease:'bounce'})
      }

      TweenMax.from(".mycard",{delay:2, duration:2,y:'-300%',rotation:180, ease:'bounce'})





    })




    const handleimg = (message) => {

      answerclicked.value=false


      if(first.value) {


        TweenMax.from(".myphoto",{duration:2,x:'80vh', ease:'bounce'})
        imgurl.value =  rows.value[0].img_url

        first.value = false
      }else{

        if((message==1)  ) {
          if (rows.value.length == id.value+1 ) {
              console.log("c'est la fin")
              handleRedirectWaiting()
            }

          if (rows.value.length > id.value+1 ) {

            id.value +=1
            animationx.value=-80

            //TweenMax.to(".myphoto",{duration:2,x: eval("'" + animationx.value + "vw'")})


            setTimeout(() => {
              imgurl.value = rows.value[id.value].img_url
            }, "1000")

            TweenMax.from(".myphoto",{delay:1.5, duration:2,x:eval("'" + (-animationx.value)*2 + "vw'")})



          } else {

          }

        } else {

          if(id.value>0) {id.value -= 1
            animationx.value=0
            //TweenMax.to(".myphoto",{duration:2,x: eval("'" + animationx.value*2 + "vw'")})


            setTimeout(() => {
              imgurl.value = rows.value[id.value].img_url
            }, "1000")

            TweenMax.from(".myphoto",{delay:1.5, duration:2,x:eval("'" + (-animationx.value) + "vw'")})


          }else{
            id.value = 0
          }


        }







      }
      answercorrect.value=null
      setTimeout(() => {
        propositions.value = rows.value[id.value].propositions

            }, "1500")

      setTimeout(() => {

        answerclicked.value=true
            }, "2500")






    }




    return {
      first,
      startthegame,
      answercorrect,
      handkeCheckAnswer,
      display,
      imgurl,
      handleimg,
      propositions,
      answerclicked,
      handleSwipeRight ({ evt, ...newInfo }) {

        handleimg(0)

      },
      handleSwipeLeft ({ evt, ...newInfo }) {
        handleimg(1)

      },

    }

  }



  }
)
</script>


<style>

  .mycard{
    background: rgb(2,0,36);
    background: linear-gradient(62deg, rgba(2,0,36,1) 0%, rgba(101,101,152,1) 100%, rgba(0,212,255,1) 100%);
  }

  .myfooter{
    background: rgb(2,0,36);
    background: linear-gradient(62deg, rgba(2,0,36,1) 0%, rgba(101,101,152,1) 100%, rgba(0,212,255,1) 100%);

  }

  .page{
    background:black;
  }



</style>

