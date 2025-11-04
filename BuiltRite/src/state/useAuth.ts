import { create } from 'zustand'
import { supabase } from '../lib/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'

type AuthState = {
  user: User | null
  session: Session | null
  loading: boolean
  init: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  init: async () => {
    const { data } = await supabase.auth.getSession()
    set({
      user: data.session?.user ?? null,
      session: data.session ?? null,
      loading: false,
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        session: session ?? null,
      })
    })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },
}))
