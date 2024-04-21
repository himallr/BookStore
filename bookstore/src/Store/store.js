import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("UserID");
            state.isLoggedIn = false;
        }
    },
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
            console.log("Admin logged in:", state.isLoggedIn);
        },
        logout(state) {
            localStorage.removeItem("Token");
            localStorage.removeItem("adminID");
            state.isLoggedIn = false;
        }
    },
});

// const initialFavStates = {
//     favListItems: localStorage.getItem("FavItems") ? JSON.parse(localStorage.getItem("FavItems")) : []
// }
// const favSlice = createSlice({
//     name: 'fav',
//     initialState: initialFavStates,
//     reducers: {
//         adding(state, action) {
//             console.log(action.payload); //to store the books items

//             let existFavItems = state.favListItems?.findIndex(item => item._id === action.payload?._id)

//             if (existFavItems >= 0) {
//                 alert("Already in Favourites")
//             }
//             else {

//                 let favItems = { ...action.payload }

//                 state.favListItems?.push(favItems)

//                 localStorage.setItem("FavItems", JSON.stringify(state.favListItems))

//             }
//         },
//         removing(state, action) {
//             let filteredItems = state.favListItems?.filter((item) => item?._id !== action.payload?._id)

//             state.favListItems = filteredItems;

//             localStorage.setItem("FavItems", JSON.stringify(state.favListItems))

//         }
//     },
// });


const favSlice = createSlice({
    name: 'fav',
    initialState: {
        favListItems: [],
    },
    reducers: {
        setFavListItems(state, action) {
            state.favListItems = action.payload;
            console.log(action);
        },
    },
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        addToCart: [],
    },
    reducers: {
        addToCart(state, action) {
            // action.payload should contain the product details to be added to the cart
            state.addToCart = action.payload
            console.log(action);
        },
        removeFromCart(state, action) {
            // action.payload should contain the product ID to be removed from the cart
            return state.filter(item => item.id !== action.payload);
        },
        clearCart(state) {
            return [];
        },
    },
});

export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;
export const favActions = favSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer,
        cart: cartSlice.reducer,
        fav: favSlice.reducer
    },
});
