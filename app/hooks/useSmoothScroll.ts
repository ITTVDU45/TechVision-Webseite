import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default function useSmoothScroll() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    
    const smoothScroll = (e) => {
      e.preventDefault()
      const targetId = e.currentTarget.getAttribute('href')
      const target = document.querySelector(targetId)
      
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 70
          },
          ease: 'power3.inOut'
        })
      }
    }

    links.forEach(link => {
      link.addEventListener('click', smoothScroll)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll)
      })
    }
  }, [])
}