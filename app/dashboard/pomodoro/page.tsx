'use client'

//React & Next
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

//Components
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

//Utils
import { Play, Pause, RotateCcw, Settings, ArrowLeft } from 'lucide-react'
import { PomodoroTimerProps } from '@/lib/utils/interfaces'

export default function PomodoroTimer({ onComplete, coins }: PomodoroTimerProps) {
  //States
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(100)
  const [selectedBackground, setSelectedBackground] = useState('/pomodoroBgs/AbstractBlue.jpeg')
  const [showBackgroundModal, setShowBackgroundModal] = useState(false)

  const router = useRouter()

  const backgrounds = [
    { id: 1, url: '/pomodoroBgs/AbstractBlue.jpeg', price: 50 },
    { id: 2, url: '/pomodoroBgs/HexagonsPatterns.png', price: 100 },
    { id: 3, url: '/pomodoroBgs/WavesOrange.jpg', price: 150 },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1
          setProgress((newTime / (25 * 60)) * 100)
          return newTime
        })
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      onComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, onComplete])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
    setProgress(100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center" style={{backgroundImage: `url(${selectedBackground})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <Button  variant="secondary"
        onClick={() => router.push('/dashboard')} 
        className="absolute top-4 left-4"
      >
        <ArrowLeft/>
      </Button>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <div className="text-6xl font-bold mb-8">{formatTime(time)}</div>
        <Progress value={progress} className="w-64 mb-8" />
        <div className="flex justify-center space-x-4">
          <Button onClick={toggleTimer} size="lg">
            {isActive ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-6 w-6" />
            Reset
          </Button>
        </div>
      </div>
      <Dialog open={showBackgroundModal} onOpenChange={setShowBackgroundModal}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            <Settings className="mr-2 h-4 w-4" />
            Change Background
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Background</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {backgrounds.map((bg) => (
              <div key={bg.id} className="space-y-2">
                <img src={bg.url} alt={`Background ${bg.id}`} className="w-full h-32 object-cover rounded-md" />
                <Button
                  onClick={() => {
                    setSelectedBackground(bg.url)
                    setShowBackgroundModal(false)
                  }}
                  disabled={coins < bg.price || selectedBackground === bg.url}
                  className="w-full"
                
                >
                  {selectedBackground === bg.url ? 'Selected' : `Select (${bg.price} coins)`}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}