import { supabase } from 'src/supabase'
import useAuthUser from './UseAuthUser'
import {v4 as uuidv4} from 'uuid'

export default function useApi() {

  const {user} = useAuthUser()

// My my functions :  Get rows from table

  const GetColFromTable = async (table,col) => {
    /* pull data of a table (or specific row)
       if you want all the data , put '*' in col inpu
    */
    const {data, error} = await supabase
    .from(table)
    .select(col)

    if(error) throw error
    return data
  }

  //  // // //


  const list = async (table,order) => {
    const {data, error} = await supabase
    .from(table)
    .select('*')
    .order(order, { ascending: true })



    if(error) throw error
    return data
  }


  const productlistwithlikeditem = async (message) => {
    const { data, error } = await supabase
    .rpc('product_list_with_liked', {
      f_userid  : message
    })
    if(error) throw error
    return data
  }


  const getById = async (table,col, id) => {
    const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(col, id);
    if (error) throw error;
    return data[0];
  }

  const post = async (table, form) => {
    console.log('voici le user : ' , user)

    const { data, error } = await supabase
    .from(table)
    .insert([
      {
        ...form,

        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([
        {
          ...form,
        },
      ])
      .match({ id: form.id });

    if (error) {
      console.log("erreur", error.value);
      throw error;
    }

    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error) throw error;

    return data, error;
  };

  const removefromlikes = async (table,col, keyword) => {
    const { data, error } = await supabase.from(table).delete().eq(col, keyword);

    if (error) throw error;

    return data, error;
  };

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4();
    const { error } = supabase.storage.from(storage).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    const publicUrl = await getUrlPublic(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  const getUrlPublic = async (fileName, storage) => {
    const { publicURL, error } = supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    if (error) throw error;
    return publicURL;
  };

  const likefunction = async (prod_id,user_id) => {

    const { data, error } = await supabase
    .rpc('like_function_1', {
       prodid : prod_id, userid :user_id
    })

    if (error) throw error
    return(data)

    }


    const dislikefunction = async (prod_id,user_id) => {

      const { data, error } = await supabase
      .rpc('dislike_function', {
         prodid : prod_id, userid :user_id
      })

      if (error) throw error
      return(data)

      }


      const jsonget = async (table) => {
        const {data, error} = await supabase
        .from(table)
        .select('categoryscore')
        .contains('categoryscore', ['oil'])






        if(error) throw error
        return data
      }



      const quizlist = async (user_id) => {

        const { data, error } = await supabase
        .rpc('quiz_list', {
          f_userid  :user_id
        })

        if (error) throw error
        return(data)

        }



      const quizcheckifuserexist = async (user_id,category_name) => {

        const { data, error } = await supabase
        .rpc('quiz_start_the_quiz', {
          userid  :user_id,categoryname:category_name
        })

        if (error) throw error
        return(data)

        }

        const quizcheckanswer = async (user_id,category_name,question_id,answerofuser) => {

          const { data, error } = await supabase
          .rpc('quiz_check_answer', {
            userid  :user_id,tabname:category_name,questionid:question_id,answer: answerofuser
          })

          if (error) throw error
          return(data)

          }



  return {

    list,
    post,
    getById,
    update,
    remove,
    uploadImg,
    likefunction,
    productlistwithlikeditem,
    dislikefunction,
    removefromlikes,
    jsonget,
    quizlist,
    quizcheckifuserexist,
    quizcheckanswer
  }
}
