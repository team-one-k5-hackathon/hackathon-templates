// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { useState } from "react"

import { useTranslations } from "next-intl"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useDemoStore } from "@/stores/demo"

export default function Settings() {
  const { demo, setDemo } = useDemoStore((state) => state)
  const [demoValue, setDemoValue] = useState(demo)
  const { toast } = useToast()

  // Translations
  const t = useTranslations("Settings")

  const handleSave = () => {
    setDemo(demoValue)
    toast({
      title: "Settings saved",
      description: `Demo mode is now ${demoValue ? "enabled" : "disabled"}`,
    })
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t("general.title")}</CardTitle>
          <CardDescription>{t("general.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="demo-mode">{t("general.demo.title")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("general.demo.description")}
              </p>
            </div>
            <Switch
              id="demo-mode"
              checked={demoValue}
              onCheckedChange={setDemoValue}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>{t("general.demo.save")}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
