import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, type MeetingName } from '../lib/supabase'

// Fetch all meeting names from Supabase
export function useMeetingNames() {
  return useQuery({
    queryKey: ['meetingNames'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meeting_names')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as MeetingName[]
    },
  })
}

// Add a new meeting name to Supabase
export function useAddMeetingName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { name: string; category: string | null }) => {
      const { data, error } = await supabase
        .from('meeting_names')
        .insert([{ name: payload.name, category: payload.category, votes: 0 }])
        .select()
        .single()

      if (error) throw error
      return data as MeetingName
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingNames'] })
    },
  })
}

// Vote for a meeting name
export function useVoteMeetingName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      // First, get current votes
      const { data: current, error: fetchError } = await supabase
        .from('meeting_names')
        .select('votes')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Increment votes
      const { data, error } = await supabase
        .from('meeting_names')
        .update({ votes: (current.votes || 0) + 1 })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as MeetingName
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingNames'] })
    },
  })
}
