import { User } from "../../interfaces/UserInterfaces";

interface UserState {
    user: User | null;
}

interface UserAction {
    type: string;
    payload?: any;
}

const initialState: UserState = {
    user: null
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case "user/login":
            return { ...state, user: action.payload };

        case "user/logout":
            return { ...state, user: null };

        default:
            return state;
    }
};

export default userReducer;