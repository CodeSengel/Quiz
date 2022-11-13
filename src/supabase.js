import { createClient } from '@supabase/supabase-js'
import useAuthUser from './composables/UseAuthUser'



const supabaseUrl = "https://vzhiunkcjujoxgzlqoyc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6aGl1bmtjanVqb3hnemxxb3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ1MzgzMjksImV4cCI6MTk2MDExNDMyOX0.2EHA5LaMKFK-NjnN4RtYH1voe5DeNyPhLhnEXmMRtTk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event,session) => {
  const {user}=useAuthUser()
  user.value = session?.user || null

})




export default function useSupabase (){
  return {supabase}
}

