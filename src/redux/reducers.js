import { combineReducers } from "redux"

const initMember = {
    members: [
            {
                "name": "Emma",
                "position": "CEO",
                "pic": "mem1.jpg"
            },
            {
                "name": "Paul",
                "position": "Vice President",
                "pic": "mem2.jpg"
            },
            {
                "name": "Jeny",
                "position": "Engineer",
                "pic": "mem3.jpg"
            }
        ]
}
const departmentReducer = (state = initMember, action) => {
    switch(action.type) {
        case 'SET_MEMBERS' : 
            return { ...state, members: action.payload }

            default: 
                return state;
    }
}

const youtubeReducer = (state={youtube: []}, action) => {
    switch (action.type) {
        case 'SET_YOUTUBE' :
            return {...state, youtube: action.payload}
        default : 
            return state;
        }
    }

    const flickrReducer = (state={flickr: []}, action) => {
        switch (action.type) {
            case 'SET_FLICKR' :
            return {...state, flickr: action.payload}
            default : 
            return state;
        }
    }

const reducers = combineReducers({
    departmentReducer, youtubeReducer, flickrReducer
})
export default reducers;

