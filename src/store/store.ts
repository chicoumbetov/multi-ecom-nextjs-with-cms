import {
	Reducer,
	UnknownAction,
	combineReducers,
	configureStore
} from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'
import { PersistPartial } from 'redux-persist/lib/persistReducer'
import storage from 'redux-persist/lib/storage'

import { cartSlice } from './cart/cart.slice'

const persistConfig = {
	key: 'multi-e-com-shop',
	storage,
	whiteList: ['cart']
}

const combinedReducers = combineReducers({
	cart: cartSlice.reducer
})

// Define the shape of your base root state before persistence
export type RootState = ReturnType<typeof combinedReducers>

// Conditionally apply persistReducer, and use a double cast for both branches.
// This is necessary because TypeScript's strictness prevents a direct cast when types are too dissimilar.
const rootReducer: Reducer<TypeRootState, UnknownAction> =
	typeof window !== 'undefined'
		? (persistReducer(
				persistConfig,
				combinedReducers
			) as unknown as Reducer<TypeRootState, UnknownAction>)
		: (combinedReducers as unknown as Reducer<TypeRootState, UnknownAction>) // Double cast the server-side reducer as well

// Augment the RootState type to include the _persist property
// This is crucial for TypeScript to understand the persisted state shape.
// Use 'unknown' for the second generic of Reducer to align with Redux Toolkit's UnknownAction
export type TypeRootState = RootState & PersistPartial

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
})

// persistor should only be created on the client side
export const persistor =
	typeof window !== 'undefined' ? persistStore(store) : null // Or handle null appropriately if you use it in components
