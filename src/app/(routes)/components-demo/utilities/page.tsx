// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Alert } from "@/components/utils/alert"

export default function UtilitiesDemoPage() {
  const [switchOn, setSwitchOn] = useState(false)

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Utilities</h1>
        <p className="text-muted-foreground mt-1">
          Alerts, inputs, and interactive controls.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Alerts
        </h2>
        <div className="grid gap-3">
          <Alert
            type="success"
            title="Upload complete"
            content="Your file has been processed successfully."
          />
          <Alert
            type="info"
            title="New quarter starting"
            content="Q3 data will be available from July 1st."
          />
          <Alert
            type="warning"
            title="Budget threshold reached"
            content="Operating expenses are at 90% of budget."
          />
          <Alert
            type="error"
            title="Sync failed"
            content="Could not connect to the data source. Retry in a moment."
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Forms & Inputs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="demo-text">Text input</Label>
                <Input id="demo-text" placeholder="Enter a value…" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="demo-select">Select</Label>
                <Select>
                  <SelectTrigger id="demo-select">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">Q1 2026</SelectItem>
                    <SelectItem value="q2">Q2 2026</SelectItem>
                    <SelectItem value="q3">Q3 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="demo-textarea">Textarea</Label>
                <Textarea
                  id="demo-textarea"
                  placeholder="Write a comment…"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="demo-switch"
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
                <Label htmlFor="demo-switch">
                  {switchOn ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
