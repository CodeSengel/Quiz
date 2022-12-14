
import { ref } from 'vue'
import useSupabase from 'src/supabase'
import {useQuasar } from 'quasar'


const user = ref(null)
export default function useAuthUser () {

  const $q = useQuasar()

    const {supabase} = useSupabase()


  const login = async ({email,password}) => {
      console.log('on arrive là ')
      console.log('voici : ', supabase)

      const {user, error} = await supabase.auth.signInWithPassword({email,password})

      if (error) throw error
      return user





  }

 /* const loginWithSocialProvider = async (myprovider) => {

    const { user, session, error } = await supabase.auth.signIn({
      provider: myprovider,
    })






    if (error) throw error
    return user,session
  } */

  const logout = async () => {
    const {user,error} = await supabase.auth.signOut()
    if (error) throw error

  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async ({email,password, ...meta}) => {





    const {user, error} = await supabase.auth.signUp(
      {
        email,
        password
      },
      {
        data: meta,
        redirectTo: '${windows.location.origin}/me?fromEmail=registrationConfirmation'
      }

      )
      if (error) throw error
      return user
  }

  const update = async (data) => {
    const { user,error} = await supabase.auth.update(data)
    if (error) throw error
    return user
  }


  const sendPasswordResetEmail = async (email) => {


    const { data,error} = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  }

  const resetPassword = async (accessToken, newPassword) => {
    const {user, error} = await supabase.auth.updateUser (
      accessToken,
      {password: newPassword}
    )
    if (error) throw error
    return user
  }


  const checkUserExist = async (message) => {

  const { data, error } = await supabase
  .rpc('quiz_check_email', { emailtochek : message})
  if (error) throw error

  }

  const emptycheckUserExist = async (message) => {

    const { data, error } = await supabase
    .rpc('quiz_empty_email_check_tab',{emailtoremove : message})
    if (error) throw error

    }



  const checkUserAdmin = async (message) => {

    const { data, error } = await supabase
    .rpc('check_big', {
      userid : message
    })

    if (error) throw error
    return(data)

    }



















  return {
    user,
    login,
    //loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
    checkUserExist,
    emptycheckUserExist,
    checkUserAdmin

  }
}
