// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

// @ts-check
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
    plugins: [
        "@ianvs/prettier-plugin-sort-imports"
    ],
    endOfLine: "lf",
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "^(next/(.*)$)|^(next$)",
        "",
        "<THIRD_PARTY_MODULES>",
        "",
        "^@workspace/(.*)$",
        "",
        "^types$",
        "^@/types/(.*)$",
        "^@/config/(.*)$",
        "^@/lib/(.*)$",
        "^@/hooks/(.*)$",
        "^@/components/ui/(.*)$",
        "^@/components/(.*)$",
        "^@/registry/(.*)$",
        "^@/styles/(.*)$",
        "^@/app/(.*)$",
        "^@/www/(.*)$",
        "^@/(.*)$",
        "",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"]
}