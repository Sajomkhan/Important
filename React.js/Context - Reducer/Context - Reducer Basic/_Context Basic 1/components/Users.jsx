import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import User from './User'

const Users = () => {

  const {users, setUsers} = useContext(UsersContext)

  return (
    <section className='users'>
      {users.map(user => <User key={user.id} user={user} />)}        
    </section>
  )
}

export default Users