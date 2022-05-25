import React,{useState,useEffect} from 'react';
import {getUserSuggeestions} from '../services/firebase';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import SuggestionProfile from './SuggestionProfile';
const Suggestion = ({userId,following,userDocId}) => {
  const [suggestedUsers,setSuggestedUsers] = useState(null);
  useEffect(()=>{
    const getSuggestions = async()=>{
      const users = await getUserSuggeestions(userId);
      const suggestions = users.filter(item=>{
        if(!following.includes(item.userId)){
            return item;
        }
    })
      setSuggestedUsers(suggestions);
    }
    if(userId){
      getSuggestions()
    }
  },[userId,following])
  return (
    <>
      {
        !suggestedUsers?<Skeleton count={3} height={30}/>:
        <section>
        <h2 className='mb-4 text-gray-600'>Suggestions For You</h2>
        {
            suggestedUsers && suggestedUsers.map(user=>{
              return(
                <SuggestionProfile userDocId={userDocId} suggestedUser={user} key={user.docId} userId={userId}/>
                )
              })
            }
            </section> 
      }
    </>
  )
}

export default Suggestion;









