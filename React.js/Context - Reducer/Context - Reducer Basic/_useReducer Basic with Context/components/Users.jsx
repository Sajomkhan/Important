import { useUsersContext } from '../hooks/useUsersContext';
import User from './User'

const Users = () => {

  const { state } = useUsersContext();

  return (
    <section className='users'>
      {state.users.map(user => <User key={user.id} user={user} />)}        
    </section>
  )
}

export default Users