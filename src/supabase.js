import { createClient } from '@supabase/supabase-js'
import useAuthUser from './composables/UseAuthUser'



const supabaseUrl = process.env.VUE_APP_SUPA_URL
const supabaseAnonKey = process.env.VUE_APP_SUPA_ANON

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event,session) => {
  const {user}=useAuthUser()
  user.value = session?.user || null

})




export default function useSupabase (){
  return {supabase}
}

