"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { cardData } from "@/constants/cardData"
import ValentineCard from "@/components/ValentineCard"
import AnimatedBackground from "@/components/AnimatedBackground"
import ParticleEffect from "@/components/ParticleEffect"

const SWIPE_THRESHOLD = 100 // Minimum distance to trigger a swipe

export default function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showHeartsOut, setShowHeartsOut] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleSwipe = (newDirection: number) => {
    const newIndex = currentIndex + newDirection
    if (newIndex >= 0 && newIndex < cardData.length) {
      setDirection(newDirection)
      setCurrentIndex(newIndex)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (quizCompleted && info.offset.x > SWIPE_THRESHOLD && currentIndex > 0) {
      handleSwipe(-1)
    } else if (quizCompleted && info.offset.x < -SWIPE_THRESHOLD && currentIndex < cardData.length - 1) {
      handleSwipe(1)
    }
  }

  const handleCorrectAnswer = () => {
    setShowHeartsOut(true)
    setQuizCompleted(true)
    setTimeout(() => {
      setShowHeartsOut(false)
      handleSwipe(1)
    }, 2000)
  }

  useEffect(() => {
    if ((currentIndex === 0 && direction === -1) || (currentIndex === cardData.length - 1 && direction === 1)) {
      setShowHeartsOut(true)
      setTimeout(() => {
        setShowHeartsOut(false)
      }, 5000)
    }
  }, [currentIndex, direction])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <AnimatedBackground />
      {showHeartsOut && <ParticleEffect type="hearts" />}
      <div className="relative w-80 h-[450px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            drag={quizCompleted ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{
              cursor:
                "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22red%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z%22/%3E%3C/svg%3E') 8 8, auto"
            }}
            className="absolute inset-0"
          >
            <ValentineCard
              {...cardData[currentIndex]}
              isSpecialCard={currentIndex === 0 || currentIndex === cardData.length - 1}
              onCorrectAnswer={currentIndex === 0 ? handleCorrectAnswer : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {quizCompleted && (
        <p className="mt-4 text-center text-white bg-pink-600 px-4 py-2 rounded-full shadow-md">
          Vuốt sang trái hoặc phải để xem các thẻ khác
        </p>
      )}
    </div>
  )
}

