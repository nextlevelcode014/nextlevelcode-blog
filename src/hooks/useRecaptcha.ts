import { get } from 'http'
import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export const useReCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const getReCaptchaToken = useCallback(
    async (action: string) => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available')
        return null
      }

      try {
        const token = await executeRecaptcha(action)
        return token
      } catch (error) {
        console.error('Erro ao executar reCAPTCHA:', error)
        return null
      }
    },
    [executeRecaptcha],
  )

  return { getReCaptchaToken }
}
