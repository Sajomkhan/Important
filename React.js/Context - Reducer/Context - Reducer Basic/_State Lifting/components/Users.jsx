import User from './User'

const Users = ({ users, handleDeleteUsers }) => {
  return (
    <section className='users'>
      {users.map(user => <User key={user.id} user={user} handleDeleteUsers={handleDeleteUsers} />)}        
    </section>
  )
}

export default Users