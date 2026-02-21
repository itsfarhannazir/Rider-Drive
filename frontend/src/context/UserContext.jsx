import { createContext, useState } from 'react'

export const userDataContext = createContext(); 

const UserContext = ({children}) => {

  const [user , setUser] = useState({
    fullname : {
      firstname : '',
      lastname : ''
    },
    email : '',
  })
  
  return (
    <div>
      <userDataContext.Provider value={{user , setUser}}>  
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export {UserContext} 
