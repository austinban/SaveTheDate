import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'
import mammoth from 'mammoth'
import anyDateParser from 'any-date-parser'

export interface RawTextObject {
  fileName: string
  value: string
}

export interface DateObject {
  originalString: string
  parsedDate: Date
}

export interface ParsedDatesObject {
  fileName: string
  dates: DateObject[]
}

const cleanDateString = (dateString: string): string => {
  return dateString.replaceAll('/', ' ').replaceAll('of ', '').replaceAll(' ', '-')
}

const parseDatesFromString = (rawText: string): DateObject[] => {
  const parsedDates: DateObject[] = []

  const regexExpressionArray: string[] = [
    '[0-9]{1,2}(\\/|-|.|\\s){1}[0-9]{1,2}(\\/|-|.|\\s){1}[0-9]{4}', // 01/01/2021 or 01-01-2021 or 01.01.2021 or 01 01 2021
    '\\d{4}(\\/|-|.|\\s)\\d{1,2}(\\/|-|.|\\s)\\d{1,2}', // 2021/01/01 or 2021-01-01 or 2021.01.01 or 2021 01 01
    '\\d{1,2}(st|nd|rd|th)*(\\/|-|.|\\s)(January|February|March|April|May|June|July|August|September|October|November|December)(\\/|-|.|\\s)\\d{4}', // 01 January 2021 or 01-January-2021 or 01.January.2021 or 1st January 2021
    '\\d{1,2}(st|nd|rd|th)*(\\/|-|.|\\s)(of)*(\\s)*(January|February|March|April|May|June|July|August|September|October|November|December)(\\/|-|.|\\s)\\d{4}' // 01 of January 2021 or 01-of-January-2021 or 01 of January 2021 or 1st of January 2021
  ]

  regexExpressionArray.forEach((regexExpression: string) => {
    const regex = new RegExp(regexExpression, 'gi')
    const matches = rawText.match(regex)
    if (matches) {
      matches.forEach((match: string) => {
        const parsedDate = anyDateParser.attempt(cleanDateString(match))
        const newDateObject = new Date(parsedDate.year, parsedDate.month, parsedDate.day)

        parsedDates.push({
          originalString: match,
          parsedDate: newDateObject
        })
      })
    }
  })

  return parsedDates
}

export const useFileParserStore = defineStore('fileParser', () => {
  const files: Ref<File[]> = ref([])
  const rawTextFiles: Ref<RawTextObject[]> = ref([])
  const parsedDates: Ref<ParsedDatesObject[]> = ref([])

  const addFile = (file: File) => {
    // Add file to files array for reference
    files.value = [...files.value, file]

    const reader: FileReader = new FileReader()

    // Use reader to convert file to arrayBuffer to then be translated into text using Mammoth
    reader.onloadend = () => {
      if (!reader.result) {
        console.log('File Read Error')
        return null
      }

      const arrayBuffer = reader.result as ArrayBuffer

      mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
        // Add extracted string to rawTextFiles array
        rawTextFiles.value = [
          ...rawTextFiles.value,
          { fileName: file.name, value: resultObject.value }
        ]
      })
    }
    reader.readAsArrayBuffer(file)
  }

  const parseDates = () => {
    rawTextFiles.value.forEach((rawTextFile: RawTextObject) => {
      console.log(parseDatesFromString(rawTextFile.value))

      parsedDates.value = [
        ...parsedDates.value,
        {
          fileName: rawTextFile.fileName,
          dates: parseDatesFromString(rawTextFile.value)
        }
      ]
    })
  }

  return { files, rawTextFiles, addFile, parseDates, parsedDates }
})
