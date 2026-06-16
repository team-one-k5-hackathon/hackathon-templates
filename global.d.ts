// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import en from "./i18n/en.json"

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
