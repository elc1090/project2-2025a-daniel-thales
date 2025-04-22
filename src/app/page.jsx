"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { useState } from "react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ExercisesPage } from "@/components/exercises-page"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {

  const [selectedContent, setSelectedContent] = useState("exercicios")

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar onSelect={setSelectedContent} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {selectedContent === "exercícios" && <ExercisesPage />}
              {selectedContent === "bíceps" && <h1>Exercícios! Bíceps</h1>}
              {selectedContent === "costas" && <h1>Exercícios! Coastas</h1>}
              {selectedContent === "abdômen" && <h1>Exercícios! Abdômen</h1>}
              {selectedContent === "meusfavoritos" && <h1>Meus Favoritos</h1>}
              {selectedContent === "meustreinos" && <h1>Meus Treinos</h1>}
              {selectedContent === "meuperfil" && <h1>Meu Perfil</h1>}
              {selectedContent === "preferencias" && <h1>Preferências</h1>}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
