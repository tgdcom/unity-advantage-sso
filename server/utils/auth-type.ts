export interface Profile {
    oid: string
    given_name: string
    family_name: string
    extension_hasActiveEdwSubscription?: boolean
    extension_hasActiveUmgSubscription?: boolean
  }

export interface User {
    id: string
    name: string
    hasActiveEdwSubscription: boolean
    hasActiveUmgSubscription: boolean
  }
