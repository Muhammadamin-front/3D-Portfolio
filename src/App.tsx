import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { HeadingTextRolls } from './components/heading-text-rolls'
import { PwaInstall } from './components/pwa-install'
import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const contactHref = 'mailto:hello@madamin.design'
const INTRO_DURATION_MS = 1850

const services = [
  {
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    name: 'Branding',
    description:
      'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

const projects = [
  {
    name: 'Nextlevel Studio',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
]

type FadeInProps = PropsWithChildren<{
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  style?: CSSProperties
}>

function FadeIn({ children, className, delay = 0, duration = 0.7, x = 0, y = 30, style }: FadeInProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function IntroScreen({ visible, reducedMotion }: { visible: boolean; reducedMotion: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0C0C0C] px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.p
            className="hero-heading whitespace-nowrap text-center text-[clamp(0.85rem,3vw,2.25rem)] font-black uppercase leading-none"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 16, filter: 'blur(8px)', letterSpacing: '0.34em' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.24em' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{
              duration: reducedMotion ? 0 : 0.9,
              delay: reducedMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Welcome to my world
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function ContactButton() {
  return (
    <motion.a
      href={contactHref}
      className="contact-button inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white sm:gap-2 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Contact Madamin by email"
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </motion.a>
  )
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: PropsWithChildren<{
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}>) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.25 })

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const element = ref.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const isNear =
        event.clientX >= bounds.left - padding &&
        event.clientX <= bounds.right + padding &&
        event.clientY >= bounds.top - padding &&
        event.clientY <= bounds.bottom + padding

      if (isNear) {
        setActive(true)
        x.set((event.clientX - (bounds.left + bounds.width / 2)) / strength)
        y.set((event.clientY - (bounds.top + bounds.height / 2)) / strength)
      } else if (active) {
        setActive(false)
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [active, padding, strength, x, y])

  const reset = () => {
    setActive(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        willChange: 'transform',
        transition: active ? activeTransition : inactiveTransition,
      }}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

function HeroSection() {
  return (
    <section className="relative isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-[#0C0C0C]" aria-labelledby="hero-title">
      <FadeIn y={-20} className="relative z-30">
        <nav className="flex items-center justify-between px-5 pt-5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#D7E2EA] sm:px-6 sm:pt-6 sm:text-sm md:px-10 md:pt-8 md:text-lg lg:text-[1.25rem]" aria-label="Main navigation">
          {[
            ['About', '#about'],
            ['Price', '#services'],
            ['Projects', '#projects'],
            ['Contact', contactHref],
          ].map(([label, href]) => (
            <a key={label} href={href} className="transition-opacity duration-200 hover:opacity-70">
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="relative z-0 overflow-hidden">
        <div>
          <h1 id="hero-title" className="hero-heading hero-title mt-7 w-full whitespace-nowrap text-center font-black uppercase leading-[0.88] sm:mt-8 md:mt-5">
            Hi i&apos;m it girl
          </h1>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(82vw,360px)] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[430px] sm:translate-y-0 md:w-[510px] lg:w-[560px] xl:w-[630px]">
        <FadeIn delay={0.6} y={30} className="w-full">
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out" className="pointer-events-auto w-full">
            <img
              src="/images/it-girl-hero.png"
              alt="IT Girl, 3D creator"
              className="h-auto w-full select-none object-contain [filter:drop-shadow(0_18px_44px_rgba(118,33,176,0.2))]"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-3 px-5 pb-5 sm:gap-5 sm:px-6 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[145px] text-[clamp(0.68rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

function MarqueeRow({ images, direction, offset }: { images: string[]; direction: 'left' | 'right'; offset: number }) {
  const base = offset - 200
  const translate = direction === 'right' ? base : -base

  return (
    <div
      className="flex w-max gap-3"
      style={{ transform: `translate3d(${translate}px, 0, 0)`, willChange: 'transform' }}
      aria-hidden="true"
    >
      {[...images, ...images, ...images].map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt=""
          loading="lazy"
          className="h-[180px] w-[280px] flex-none rounded-2xl object-cover sm:h-[220px] sm:w-[342px] lg:h-[270px] lg:w-[420px]"
        />
      ))}
    </div>
  )
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setOffset(200)
      return
    }

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!sectionRef.current) return
        const sectionTop = sectionRef.current.offsetTop
        setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reduceMotion])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" aria-label="Selected motion work">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" offset={offset} />
        <MarqueeRow images={marqueeImages.slice(11)} direction="left" offset={offset} />
      </div>
    </section>
  )
}

function AnimatedCharacter({ character, progress, start, end }: { character: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="invisible">{character === ' ' ? '\u00A0' : character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }} aria-hidden="true">
        {character === ' ' ? '\u00A0' : character}
      </motion.span>
    </span>
  )
}

function AnimatedText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const words = children.split(' ')
  let characterIndex = 0

  return (
    <p ref={ref} className="max-w-[560px] text-center text-[clamp(0.95rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]" aria-label={children}>
      {words.map((word, wordIndex) => {
        const wordStart = characterIndex
        characterIndex += word.length + 1
        return (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {word.split('').map((character, index) => {
              const absoluteIndex = wordStart + index
              const start = absoluteIndex / children.length
              const end = Math.min((absoluteIndex + 8) / children.length, 1)
              return <AnimatedCharacter key={`${character}-${absoluteIndex}`} character={character} progress={scrollYProgress} start={start} end={end} />
            })}
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        )
      })}
    </p>
  )
}

function DecorativeImage({ src, alt, className, delay, x }: { src: string; alt: string; className: string; delay: number; x: number }) {
  return (
    <FadeIn delay={delay} duration={0.9} x={x} y={0} className={`absolute ${className}`}>
      <img src={src} alt={alt} className="h-auto w-full object-contain" loading="lazy" />
    </FadeIn>
  )
}

function AboutSection() {
  const text =
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10" aria-labelledby="about-title">
      <DecorativeImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
        alt="Chrome moon sculpture"
        className="left-[2%] top-[4%] w-[86px] sm:w-[140px] md:left-[4%] md:w-[190px] lg:w-[210px]"
        delay={0.1}
        x={-80}
      />
      <DecorativeImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
        alt="Abstract 3D sculpture"
        className="bottom-[7%] left-[3%] w-[76px] sm:left-[6%] sm:w-[120px] md:left-[10%] md:w-[165px] lg:w-[180px]"
        delay={0.25}
        x={-80}
      />
      <DecorativeImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
        alt="Metallic toy block"
        className="right-[2%] top-[4%] w-[86px] sm:w-[140px] md:right-[4%] md:w-[190px] lg:w-[210px]"
        delay={0.15}
        x={80}
      />
      <DecorativeImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
        alt="Futuristic 3D character"
        className="bottom-[7%] right-[3%] w-[92px] sm:right-[6%] sm:w-[145px] md:right-[10%] md:w-[200px] lg:w-[220px]"
        delay={0.3}
        x={80}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-2 sm:px-8">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn y={40}>
            <h2 id="about-title" className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
              About me
            </h2>
          </FadeIn>
          <AnimatedText>{text}</AnimatedText>
        </div>
        <FadeIn delay={0.2} className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="relative rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32" aria-labelledby="services-title">
      <FadeIn>
        <h2 id="services-title" className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl border-t border-[rgba(12,12,12,0.15)]">
        {services.map((service, index) => (
          <FadeIn key={service.name} delay={index * 0.1}>
            <article className="grid grid-cols-[minmax(80px,0.55fr)_1.45fr] items-start gap-5 border-b border-[rgba(12,12,12,0.15)] py-8 sm:grid-cols-[minmax(120px,0.55fr)_1.45fr] sm:gap-8 sm:py-10 md:py-12">
              <p className="text-[clamp(3rem,10vw,140px)] font-black leading-[0.85] text-[#0C0C0C]">{String(index + 1).padStart(2, '0')}</p>
              <div className="pt-1 sm:pt-2">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{service.name}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60 sm:mt-5">{service.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index, total }: { project: (typeof projects)[number]; index: number; total: number }) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={container} className="h-[68vh] min-h-[560px] sm:h-[78vh] sm:min-h-[660px] lg:h-[88vh] lg:min-h-[760px]">
      <motion.article
        className="sticky overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: `calc(${index * 22}px + clamp(1rem, 6vh, 5rem))`, transformOrigin: 'top center' }}
      >
        <div className="mb-5 grid grid-cols-[auto_1fr] items-end gap-x-5 gap-y-4 sm:mb-7 md:grid-cols-[auto_auto_1fr_auto] md:gap-x-8">
          <span className="text-[clamp(3rem,7vw,100px)] font-black leading-[0.8]">{String(index + 1).padStart(2, '0')}</span>
          <span className="pb-1 text-xs font-light uppercase tracking-[0.22em] opacity-60 sm:text-sm md:pb-2">{project.category}</span>
          <h3 className="col-span-2 text-[clamp(1.3rem,3.3vw,3.2rem)] font-medium uppercase leading-none md:col-span-1">{project.name}</h3>
          <div className="col-span-2 justify-self-start md:col-span-1 md:justify-self-end">
            <LiveProjectButton href={project.images[2]} />
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3">
          <div className="grid gap-3">
            <div className="overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[60px]">
              <img src={project.images[0]} alt={`${project.name} detail one`} loading="lazy" className="project-image h-[clamp(130px,16vw,230px)] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[60px]">
              <img src={project.images[1]} alt={`${project.name} detail two`} loading="lazy" className="project-image h-[clamp(160px,22vw,340px)] w-full object-cover" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[60px]">
            <img src={project.images[2]} alt={`${project.name} main view`} loading="lazy" className="project-image h-full min-h-[303px] w-full object-cover" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-3 pb-20 pt-20 text-[#D7E2EA] sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32" aria-labelledby="projects-title">
      <FadeIn>
        <h2 id="projects-title" className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-[1500px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = window.setTimeout(
      () => {
        document.body.style.overflow = previousOverflow
        setIntroComplete(true)
      },
      reducedMotion ? 250 : INTRO_DURATION_MS,
    )

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [reducedMotion])

  useEffect(() => {
    if (typeof document === 'undefined' || !introComplete) return

    document.documentElement.classList.add('ready')

    return () => {
      document.documentElement.classList.remove('ready')
    }
  }, [introComplete])

  return (
    <>
      <IntroScreen visible={!introComplete} reducedMotion={Boolean(reducedMotion)} />
      <HeadingTextRolls />
      <PwaInstall />
      <motion.main
        id="public-view"
        aria-hidden={!introComplete}
        className="overflow-x-clip bg-[#0C0C0C]"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </motion.main>
    </>
  )
}
