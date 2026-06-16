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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-colors focus:outline-none"
          aria-label={`${star} star`}
        >
          <span
            className={
              star <= (hovered || value)
                ? "text-yellow-400"
                : "text-muted-foreground"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  )
}

export default function FeedbackPage() {
  const t = useTranslations("Feedback")
  const { toast } = useToast()

  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      toast({ title: t("error.required"), variant: "destructive" })
      return
    }
    if (rating === 0) {
      toast({ title: t("error.rating"), variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          category: category || "General",
          message,
          name,
          email,
        }),
      })

      if (!res.ok) throw new Error()

      setSubmitted(true)
      toast({
        title: t("success.title"),
        description: t("success.description"),
      })
    } catch {
      toast({ title: t("error.send"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto py-8 px-6 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="text-5xl mb-2">🎉</div>
            <CardTitle>{t("success.title")}</CardTitle>
            <CardDescription>{t("success.description")}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              {t("success.again")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
      <p className="text-muted-foreground mb-6">{t("description")}</p>

      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{t("form.title")}</CardTitle>
            <CardDescription>{t("form.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{t("form.rating")}</Label>
              <StarRating value={rating} onChange={setRating} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t("form.category")}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder={t("form.category_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">
                    {t("form.categories.general")}
                  </SelectItem>
                  <SelectItem value="Bug">
                    {t("form.categories.bug")}
                  </SelectItem>
                  <SelectItem value="Feature Request">
                    {t("form.categories.feature")}
                  </SelectItem>
                  <SelectItem value="UX/Design">
                    {t("form.categories.ux")}
                  </SelectItem>
                  <SelectItem value="Performance">
                    {t("form.categories.performance")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("form.message")}</Label>
              <Textarea
                id="message"
                placeholder={t("form.message_placeholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("form.name_placeholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? t("form.sending") : t("form.submit")}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
