import { useTranslation } from 'react-i18next'

export function useLangPath() {
  const { i18n } = useTranslation()
  return (path: string) => `/${i18n.language}${path}`
}
