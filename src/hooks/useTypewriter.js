import { useEffect, useMemo, useRef, useState } from 'react'

export const useTypewriter = (phrases, opts = {}) => {
  const {
    typingMsPerChar = 70,
    deletingMsPerChar = 40,
    holdOnTypedMs = 1200,
    holdOnDeletedMs = 300,
    loop = true,
  } = opts

  const safePhrases = useMemo(() => (phrases?.length ? phrases : ['']), [phrases])
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const rafRef = useRef(null)
  const timeoutRef = useRef(null)

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  // Set random starting index when phrases change
  useEffect(() => {
    if (safePhrases.length > 1) {
      setPhraseIndex(Math.floor(Math.random() * safePhrases.length))
    }
    // Add a small random delay before starting animation
    const randomDelay = Math.random() * 1000 + 500 // 500-1500ms
    const startTimer = setTimeout(() => setIsStarted(true), randomDelay)
    return () => clearTimeout(startTimer)
  }, [safePhrases])

  useEffect(() => {
    if (!isStarted) return
    
    const current = safePhrases[phraseIndex] ?? ''

    const step = () => {
      const target = current
      const doneTyping = text === target
      const doneDeleting = text === ''

      if (!isDeleting && !doneTyping) {
        // type next char
        const next = target.slice(0, text.length + 1)
        timeoutRef.current = window.setTimeout(() => setText(next), typingMsPerChar)
        return
      }

      if (!isDeleting && doneTyping) {
        // hold before delete
        timeoutRef.current = window.setTimeout(() => setIsDeleting(true), holdOnTypedMs)
        return
      }

      if (isDeleting && !doneDeleting) {
        const next = target.slice(0, Math.max(0, text.length - 1))
        timeoutRef.current = window.setTimeout(() => setText(next), deletingMsPerChar)
        return
      }

      if (isDeleting && doneDeleting) {
        // move to next phrase
        const nextIndex = (phraseIndex + 1) % safePhrases.length
        if (!loop && nextIndex === 0) return
        setPhraseIndex(nextIndex)
        setIsDeleting(false)
        timeoutRef.current = window.setTimeout(() => setText(''), holdOnDeletedMs)
        return
      }
    }

    // Kick the sequence each time dependencies change
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [text, isDeleting, phraseIndex, safePhrases, typingMsPerChar, deletingMsPerChar, holdOnTypedMs, holdOnDeletedMs, loop, isStarted])

  return { text, phraseIndex, isDeleting, isStarted }
}
