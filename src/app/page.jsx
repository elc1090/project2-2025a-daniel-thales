"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { useState } from "react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import ExercisesPage from "@/components/exercises-page"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {

  const [selectedContent, setSelectedContent] = useState("exercicios")

  return (
    <div>
      
    </div>
  );
}
