import { persistentMap } from '@nanostores/persistent'
import { MARKETPALCE_NAME } from '../constants'
import type { StorageMarketplace } from '@/types/storage'

export const marketplaceStorage = persistentMap<StorageMarketplace>(`${MARKETPALCE_NAME}:`, {
  me: ''
})