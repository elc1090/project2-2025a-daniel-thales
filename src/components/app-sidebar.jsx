"use client"

import * as React from "react"
import Link from "next/link"
import {
  Heart,
  Command,
  CircleUserRound,
  Settings2,
  BookHeart,
  Dumbbell,
  Home
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Início",
      url: "/",
      icon: Home,
      items: [],
    },
    {
      title: "Exercícios",
      url: "/exercicios",
      icon: Dumbbell,
      items: [],
    },
    {
      title: "Meus treinos",
      url: "/meustreinos",
      icon: BookHeart,
    },
    {
      title: "Meus favoritos",
      url: "/meusfavoritos",
      icon: Heart,
    },
  ],
  navSecondary: [
    {
      title: "Meu perfil",
      url: "/meuperfil",
      icon: CircleUserRound,
    },
    {
      title: "Preferências",
      url: "/preferencias",
      icon: Settings2,
    },
  ],
}

export function AppSidebar(props) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}