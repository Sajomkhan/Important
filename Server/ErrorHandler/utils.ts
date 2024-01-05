
//==================== roote/libs/utils.ts ========================//

export const handleError = (error: unknown) => {
    console.error(error)
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  }