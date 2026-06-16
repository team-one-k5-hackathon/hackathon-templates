// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React, { JSX } from "react"
import Link from "next/link"

export function parseTextWithLinks(text: string | undefined) {
  if (!text) return []
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  const urlRegex = /(https?:\/\/[^\s]+)/g

  const elements: (string | JSX.Element)[] = []
  let lastIndex = 0

  text.replace(markdownLinkRegex, (match, label, url, index) => {
    elements.push(text.slice(lastIndex, index))
    elements.push(
      <Link
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {label}
      </Link>
    )
    lastIndex = index + match.length
    return match
  })

  const remainingText = text.slice(lastIndex)
  if (remainingText) {
    elements.push(
      ...remainingText.split(urlRegex).map((part, i) =>
        urlRegex.test(part)
          ? ((
              <Link
                key={`url-${i}`}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {part}
              </Link>
            ) as JSX.Element)
          : (part as string)
      )
    )
  }

  return elements
}
