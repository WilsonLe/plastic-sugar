"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"

interface ValentineCardProps {
  title: string
  description: string
  image: string
  icon?: LucideIcon
  isSpecialCard?: boolean
  options?: string[]
  onCorrectAnswer?: () => void
}

export default function ValentineCard({
  title,
  description,
  image,
  icon: Icon,
  isSpecialCard,
  options,
  onCorrectAnswer,
}: ValentineCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [correctOption, setCorrectOption] = useState<number | null>(null)

  useEffect(() => {
    if (options) {
      setCorrectOption(Math.floor(Math.random() * options.length))
    }
  }, [options])

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
    if (index === correctOption && onCorrectAnswer) {
      onCorrectAnswer()
    }
  }

  return (
    <Card
      className={`w-full h-full overflow-y-auto hide-scrollbar shadow-lg bg-white/95 border-pink-200 backdrop-blur-sm select-none ${isSpecialCard ? "border-4 border-pink-400" : ""}`}
    >
      <CardHeader
        className={`p-4 ${isSpecialCard ? "bg-gradient-to-r from-pink-300 to-blue-300" : "bg-gradient-to-r from-blue-200 to-pink-200"}`}
      >
        <CardTitle
          className={`text-2xl font-bold ${isSpecialCard ? "text-blue-700" : "text-pink-700"} flex items-center`}
        >
          {Icon && <Icon className={`w-6 h-6 mr-2 ${isSpecialCard ? "text-pink-600" : "text-blue-600"}`} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative w-full h-48 mb-4">
          <Image 
            src={image || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover rounded-md" 
          />
        </div>
        <p className={`${isSpecialCard ? "text-blue-600" : "text-pink-600"} mb-4`}>{description}</p>
        {options && (
          <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`w-full ${
                  selectedOption === index
                    ? index === correctOption
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-orange-500 hover:bg-orange-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

