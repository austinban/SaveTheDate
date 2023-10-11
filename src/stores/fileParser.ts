import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'
import mammoth from 'mammoth'
import anyDateParser from 'any-date-parser'

// Type definitions
export interface ProcessedFile {
  file: File
  rawText: string
  dates: DateObject[]
}

export interface DateObject {
  originalString: string
  parsedDate: Date
  contextString: string
}

export interface CalendarObject {
  key: string
  content: string
  dates: Date
  customData: {
    date: DateObject
    file: File
  }
  popover: {
    visibility: string
  }
  highlight: {
    color: string
    fillMode: string
  }
  order: number
}

// Helper functions
const cleanDateString = (dateString: string): string => {
  return dateString.replaceAll('/', ' ').replaceAll('of ', '').replaceAll(' ', '-')
}

const parseDatesFromString = (rawText: string): DateObject[] => {
  const parsedDateObjects: DateObject[] = []

  // Regex expressions to match dates in various formats
  const regexExpressionArray: string[] = [
    '[0-9]{1,2}(\\/|-|.|\\s){1}[0-9]{1,2}(\\/|-|.|\\s){1}[0-9]{4}', // 01/01/2021 or 01-01-2021 or 01.01.2021 or 01 01 2021
    '\\d{4}(\\/|-|.|\\s)\\d{1,2}(\\/|-|.|\\s)\\d{1,2}', // 2021/01/01 or 2021-01-01 or 2021.01.01 or 2021 01 01
    '\\d{1,2}(st|nd|rd|th)*(\\/|-|.|\\s)(January|February|March|April|May|June|July|August|September|October|November|December)(\\/|-|.|\\s)\\d{4}', // 01 January 2021 or 01-January-2021 or 01.January.2021 or 1st January 2021
    '\\d{1,2}(st|nd|rd|th)*(\\/|-|.|\\s)(of)*(\\s)*(January|February|March|April|May|June|July|August|September|October|November|December)(\\/|-|.|\\s)\\d{4}' // 01 of January 2021 or 01-of-January-2021 or 01 of January 2021 or 1st of January 2021
  ]

  // Loop through regex expressions and match them against the raw text
  regexExpressionArray.forEach((regexExpression: string) => {
    const regex = new RegExp(regexExpression, 'gi')
    const matches = rawText.match(regex)
    if (matches) {
      matches.forEach((match: string) => {
        const parsedDate = anyDateParser.attempt(cleanDateString(match))
        const newDateObject = new Date(parsedDate.year, parsedDate.month, parsedDate.day)
        const index = rawText.indexOf(match)
        const contextString = rawText.substring(index - 60, index + match.length + 60)
        parsedDateObjects.push({
          originalString: match,
          parsedDate: newDateObject,
          contextString: contextString
        })
      })
    }
  })

  // Return array of parsed dates
  return parsedDateObjects
}

// Store
export const useFileParserStore = defineStore('fileParser', () => {
  const processedFileObjects: Ref<ProcessedFile[]> = ref([])

  const addFile = (file: File) => {
    const reader: FileReader = new FileReader()

    // Use reader to convert file to arrayBuffer to then be translated into text using Mammoth
    reader.onloadend = () => {
      if (!reader.result) {
        console.log('File Read Error')
        return null
      }

      const arrayBuffer = reader.result as ArrayBuffer

      // Use Mammoth to extract raw text from docx file
      mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
        // Add file to processedFileObjects array as well as the parsed dates using the helper function
        processedFileObjects.value = [
          ...processedFileObjects.value,
          {
            file: file,
            rawText: resultObject.value,
            dates: parseDatesFromString(resultObject.value)
          }
        ]
      })
    }
    reader.readAsArrayBuffer(file)
  }

  // Get all dates from all files and return them as an array of CalendarObjects for use in the calendar
  const getDates = () => {
    const dates: CalendarObject[] = []
    processedFileObjects.value.forEach((file) => {
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

    // Sort dates by highest to lowest
    return dates.sort((a, b) => b.dates.getTime() - a.dates.getTime())
  }

  return {
    processedFileObjects,
    addFile,
    getDates
  }
})
