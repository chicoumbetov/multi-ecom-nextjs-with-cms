import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TypeRootState } from '@/application/store/store'

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
