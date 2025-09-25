import React, { useState } from 'react'
import userContext from './context'
function ContextProvider({children}) {
    const [userSignUp, setUserSignUp] = useState(false)
    return(
        <userContext.Provider value={{userSignUp, setUserSignUp}}>
            {children}
        </userContext.Provider>
    )

}

export default ContextProvider