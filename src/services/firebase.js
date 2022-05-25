import { collection,where,query, getDocs, limit,doc,updateDoc,arrayRemove,arrayUnion } from "firebase/firestore"
import { db } from "../lib/firebaseConfig"

export const userExits = async (username) => {
    const collectionRef = await collection(db,'users')
   const q = await query(collectionRef,where('username','==',username));
   const user = await getDocs(q);
   return user.docs.map(doc=> doc.data().length > 0);
}

export const getUserInfo = async(userId) => {
    const collectionRef = await collection(db,'users');
    const q = await query(collectionRef,where('userId','==',userId));
    const currentUser = await getDocs(q)   
    return currentUser.docs.map(doc=>({
        ...doc.data(),
        docId:doc.id,
    }))
}

export const getUserSuggeestions = async(userId) =>{
    const collectionRef = await collection(db,'users');
    const q = await query(collectionRef,where('userId','!=',userId),limit(10))
    const users = await getDocs(q)
    return users.docs.map(doc=>({
        ...doc.data(),
        docId:doc.id,
    }))
}

export const updateFollowersOfUser = async(suggestedUserDocId,currentUserId,isFollowed) => {
    const docRef = await doc(db,'users',suggestedUserDocId);
    await updateDoc(docRef,{
        follower:isFollowed?
        arrayRemove(currentUserId):
        arrayUnion(currentUserId)
    })
}

export const updateFolllowingOfCurrentUser = async(suggestedUserId,userDocId,isFollowed) => {
    const docRef = await doc(db,'users',userDocId);
    await updateDoc(docRef,{
        following:isFollowed?
        arrayRemove(suggestedUserId):
        arrayUnion(suggestedUserId)
    })
}

export const getPostsPhotos = async(userId,following) =>{
    const collectionRef = await collection(db,'photos');
    const q = await query(collectionRef,where('userId','in',following));
    const followingUsers = await getDocs(q)
    const followUsersPhotos = followingUsers.docs.map(doc=>({
        ...doc.data(),
        docId:doc.id,
    }))
    const didLikedUsers = await Promise.all(
        followUsersPhotos.map(async(photo)=>{
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)){
                userLikedPhoto = true;
            }
            const photoUserName = await getUserInfo(photo.userId)
            const {username} = photoUserName[0]
            return {username,...photo,userLikedPhoto}
        })
        )
    return didLikedUsers;
}

export const getUserByUsername = async(username) =>{
    const collectionRef = await collection(db,'users')   
    const q = await query(collectionRef,where('username','==',username))
    const userInfo = await getDocs(q)
    return userInfo.docs.map(item=>({
        ...item.data(),
        docId:item.id
    }))
}

export const getUserPhotos = async (userId)=>{
    const collectionRef = await collection(db,'photos')
    const q = await query(collectionRef,where('userId','==',userId))
    const userPhotos = await getDocs(q)
    return userPhotos.docs.map(item=>({
        ...item.data(),
        docId:item.id
    }))
}

export const isLoggedInFollowing = async (LoggedInUserId,profileUserId) => {
    const collectionRef = await collection(db,'users')    
    const q = await query(collectionRef,where('userId','==',LoggedInUserId),where('following','array-contains',profileUserId));
    const user = await getDocs(q)
    const [result = {}] =  user.docs.map(item=>{
        return {
            ...item.data(),
            docId:item.id
        }
    })
    return result.userId;
}

export const toggleFollow = async (currentUserId,CurrentUserDocId,profileUserId,profileUserDocId,isFollowing)=>{
    await updateFollowersOfUser(profileUserDocId,currentUserId,isFollowing)
    await updateFolllowingOfCurrentUser(profileUserId,CurrentUserDocId,isFollowing)    
}











