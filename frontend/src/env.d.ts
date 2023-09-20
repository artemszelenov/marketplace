/// <reference types="astro/client" />

import type { Alpine as AlpineType } from 'alpinejs'

interface Alpine extends AlpineType {
  $persist?(initValue: any): any
}

declare global {
  var Alpine: Alpine
}
