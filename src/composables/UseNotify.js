import {useQuasar} from 'quasar'

export default function useNotify (){
  const $q= useQuasar()

  const notifySuccess = (message) => {
    $q.notify ({
      type: 'positive',
      message : message || 'Très bien !'
    })
  }

  const notifyError = (message) => {
    $q.notify ({
      type: 'negative',
      message : message || ' Erreur'
    })
  }

  const notifyAnswer = (positive,icon,time,message) => {
    $q.notify ({
      type:positive ,
      icone : icon,
      message : message,
      position:'center',
      size:"300px",
      timeout:time,

    })
  }

  const notifyWelcome = (message,time) => {
    $q.notify ({

      message : message,
      position:'center',
      timeout:time,
      color : 'green'

    })
  }



  return {
    notifySuccess,
    notifyError,
    notifyAnswer,
    notifyWelcome
  }

}
