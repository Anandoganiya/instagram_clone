import {User,Suggestion} from '../components';
import useUser from '../hooks/user-info';
const Sidebar = () => {
  const {user} = useUser()
  return (
    <div className='w-full m-4 md:visible invisible'>
      <User username={user.username} fullname={user.fullName}/>
      <Suggestion userDocId={user.docId} userId={user.userId} following={user.following}/>
    </div>
  )
}

export default Sidebar