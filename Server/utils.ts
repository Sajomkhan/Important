
//==================== roote/libs/utils.ts ========================//

export const handleError = (error: unknown) => {
    console.error(error)
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  }


// ============= Time Format==========================//
  export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
      month: 'short', // abbreviated month name (e.g., 'Oct')
      day: 'numeric', // numeric day of the month (e.g., '25')
      hour: 'numeric', // numeric hour (e.g., '8')
      minute: 'numeric', // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    }
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
      month: 'short', // abbreviated month name (e.g., 'Oct')
      year: 'numeric', // numeric year (e.g., '2023')
      day: 'numeric', // numeric day of the month (e.g., '25')
    }
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric', // numeric hour (e.g., '8')
      minute: 'numeric', // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    }
  
    const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)
  
    const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)
  
    const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)
  
    return {
      dateTime: formattedDateTime,
      dateOnly: formattedDate,
      timeOnly: formattedTime,
    }
  }

  //============Convert File to URL========================//

  export const convertFileToUrl = (file: File) => URL.createObjectURL(file)
  
  export const formatPrice = (price: string) => {
    const amount = parseFloat(price)
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  
    return formattedPrice
  }
  

//========================== URL Query =====================//

import qs from 'query-string'
//------------------- Declar Type----------------  
    // ====== URL QUERY PARAMS Type
    export type UrlQueryParams = {
        params: string
        key: string
        value: string | null
      }
      
      export type RemoveUrlQueryParams = {
        params: string
        keysToRemove: string[]
      } 
//---------------------------------------  
  export function formUrlQuery({ params, key, value }: UrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    currentUrl[key] = value
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
  
  export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }