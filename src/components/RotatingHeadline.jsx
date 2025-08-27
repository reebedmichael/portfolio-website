import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useTypewriter } from '../hooks/useTypewriter'

export default function RotatingHeadline({
  aboutId,
  as = 'h1',
  className = 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
  speed,
}) {
  const [rawHeadline, setRawHeadline] = useState('')
  const phrases = useMemo(
    () => rawHeadline.split(',').map(s => s.trim()).filter(Boolean),
    [rawHeadline]
  )

  const { text, isStarted } = useTypewriter(phrases, {
    typingMsPerChar: speed?.typingMsPerChar,
    deletingMsPerChar: speed?.deletingMsPerChar,
    holdOnTypedMs: speed?.holdOnTypedMs,
    holdOnDeletedMs: speed?.holdOnDeletedMs,
    loop: true,
  })

  // Fetch initial value
  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const query = supabase
          .from('about')
          .select('id, headline')
          .limit(1)

        const { data, error } = aboutId
          ? await supabase.from('about').select('id, headline').eq('id', aboutId).single()
          : await query.single()

        if (error) throw error
        if (isMounted && data) setRawHeadline(data.headline ?? '')
      } catch (err) {
        console.error('[RotatingHeadline] fetch error', err)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [aboutId])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('about-headline')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'about', ...(aboutId ? { filter: `id=eq.${aboutId}` } : {}) },
        payload => {
          const newHeadline = payload.new?.headline
          if (typeof newHeadline === 'string') setRawHeadline(newHeadline)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [aboutId])

  const HeadingTag = as

  return (
    <HeadingTag
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Optional static prefix/suffix could go here */}
      <span className="whitespace-pre">
        {isStarted ? text : (phrases[0] || '')}
      </span>
      <span className={`inline-block w-[1ch] ${isStarted ? 'animate-pulse' : 'animate-bounce'}`} aria-hidden>
        |
      </span>
    </HeadingTag>
  )
}
