import { defineStore } from 'pinia'
import type { CalendarObject } from '@/stores/fileParser'
import { useFileParserStore } from '@/stores/fileParser'

export const useCalendarStore = defineStore('fileParser', () => {
  const fileParser = useFileParserStore()

  const getDates = () => {
    const dates: CalendarObject[] = []
    fileParser.processedFileObjects.forEach((file) => {
      file.dates.forEach((date) => {
        dates.push({
          key: date.originalString,
          content: 'teal',
          dates: date.parsedDate,
          customData: {
            date: date,
            file: file.file
          },
          popover: {
            visibility: 'hover'
          },
          highlight: {
            color: 'teal',
            fillMode: 'outline'
          },
          order: 0
        })
      })
    })

    return dates.sort((a, b) => b.dates.getTime() - a.dates.getTime())
  }

  return {
    getDates
  }
})
