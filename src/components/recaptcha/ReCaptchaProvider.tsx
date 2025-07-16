'use client'
import React, { ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

interface ReCaptchaProviderProps {
  children: ReactNode
}

const ReCaptchaProvider: React.FC<ReCaptchaProviderProps> = ({ children }) => {
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!sitekey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY não encontrada')
    return <>{children}</>
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={sitekey}>
      {children}
    </GoogleReCaptchaProvider>
  )
}

export default ReCaptchaProvider
