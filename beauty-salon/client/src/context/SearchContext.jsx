import { createContext, useReducer } from "react"

const INITIAL_STATE ={
    service: undefined,
    date: []
}

export const SearchContext = createContext(INITIAL_STATE);
const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH": 
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
    return (
        <SearchContext.Provider value={{service: state.service, date: state.date, dispatch}}>
            {children}
        </SearchContext.Provider>
    )

}