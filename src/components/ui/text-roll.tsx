"use client"

import { motion, useReducedMotion } from "motion/react"
import { Fragment, useMemo } from "react"

const ROLL_DURATION = 0.525
const LETTER_STAGGER = 0.04375
const SECOND_LAYER_DELAY = 0.175
const LOOP_PAUSE = 2
const WORD_DELAY_FACTOR = 0.0225
const ROLL_EASE = [0.22, 1, 0.36, 1] as const

export interface TextRollProps {
  text: string
  characterOffset?: number
  announce?: boolean
  className?: string
}

interface WordChunk {
  characters: string[]
  offset: number
}

function toCharacters(value: string) {
  return Array.from(value)
}

function toDisplayCharacter(character: string) {
  return /\s/u.test(character) ? "\u00a0" : character
}

function splitIntoWordChunks(text: string): WordChunk[] {
  const tokens = text.match(/\S+\s*|\s+/gu) ?? []
  let offset = 0

  return tokens.map((token) => {
    const characters = toCharacters(token)
    const chunk = { characters, offset }
    offset += characters.length
    return chunk
  })
}

function RollingCharacter({
  character,
  delay,
  reducedMotion,
}: {
  character: string
  delay: number
  reducedMotion: boolean
}) {
  const displayCharacter = toDisplayCharacter(character)
  const characterStyle = {
    backfaceVisibility: "hidden" as const,
    transformStyle: "preserve-3d" as const,
    willChange: "transform" as const,
  }

  return (
    <span
      className="heading-text-roll"
      style={{
        lineHeight: "inherit",
        perspective: "10000px",
        position: "relative",
        transformStyle: "preserve-3d",
        verticalAlign: "baseline",
      }}
    >
      <span aria-hidden="true" style={{ display: "inline-block", visibility: "hidden", whiteSpace: "pre" }}>
        {displayCharacter}
      </span>

      {reducedMotion ? (
        <span
          aria-hidden="true"
          className="heading-text-roll-layer"
          style={{
            ...characterStyle,
            inset: 0,
            position: "absolute",
            transformOrigin: "50% 25%",
          }}
        >
          {displayCharacter}
        </span>
      ) : (
        <>
          <motion.span
            aria-hidden="true"
            className="heading-text-roll-layer"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 90 }}
            transition={{
              delay,
              duration: ROLL_DURATION,
              ease: ROLL_EASE,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: LOOP_PAUSE,
            }}
            style={{
              ...characterStyle,
              inset: 0,
              position: "absolute",
              transformOrigin: "50% 25%",
            }}
          >
            {displayCharacter}
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="heading-text-roll-layer"
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{
              delay: delay + SECOND_LAYER_DELAY,
              duration: ROLL_DURATION,
              ease: ROLL_EASE,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: LOOP_PAUSE,
            }}
            style={{
              ...characterStyle,
              inset: 0,
              position: "absolute",
              transformOrigin: "50% 100%",
            }}
          >
            {displayCharacter}
          </motion.span>
        </>
      )}
    </span>
  )
}

export function TextRoll({
  text,
  characterOffset = 0,
  announce = true,
  className,
}: TextRollProps) {
  const shouldReduceMotion = useReducedMotion()
  const chunks = useMemo(() => splitIntoWordChunks(text), [text])

  return (
    <>
      {announce ? <span className="sr-only">{text}</span> : null}
      <span aria-hidden="true" className={className}>
        {chunks.map((chunk, wordIndex) => {
          const wordCharacterOffset = characterOffset + chunk.offset
          const wordInitialDelay = shouldReduceMotion ? 0 : wordCharacterOffset * WORD_DELAY_FACTOR

          return (
            <Fragment key={`${wordIndex}-${chunk.offset}`}>
              <span className="heading-text-roll-word">
                {chunk.characters.map((character, characterIndex) => (
                  <RollingCharacter
                    key={`${characterIndex}-${character}`}
                    character={character}
                    delay={shouldReduceMotion ? 0 : wordInitialDelay + characterIndex * LETTER_STAGGER}
                    reducedMotion={Boolean(shouldReduceMotion)}
                  />
                ))}
              </span>
              {wordIndex < chunks.length - 1 ? <wbr /> : null}
            </Fragment>
          )
        })}
      </span>
    </>
  )
}

export default TextRoll
