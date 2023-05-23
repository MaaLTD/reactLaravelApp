import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
});


export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        name: 'Anton Zeusenko',
        email: 'anton.zeusenko@gmail.com',
        imageUrl: 'https://drive.google.com/file/d/0B3ytW-RW0re-TFIwcDhiZ0FVMlU/view?usp=share_link&resourcekey=0-vepuNyJepSkPcOeOd3OsdQ'
    });

    const [userToken, setUserToken] = useState(null);

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const userStateContext = () => useContext(StateContext)
