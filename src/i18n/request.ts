// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ requestLocale }) => {
  // TODO: Provide a static locale, fetch a user setting, read from `cookies()`, `headers()`, etc.
  const locale = (await requestLocale) ?? "en"

  return {
    locale,
    messages: (await import(`../../i18n/${locale}.json`)).default,
  }
})
