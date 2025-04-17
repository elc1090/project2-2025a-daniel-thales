"use client"

import * as React from "react"
import {
  Heart,
  Command,
  CircleUserRound,
  Settings2,
  BookHeart,
  Dumbbell
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
      title: "Exercícios",
      url: "#",
      icon: Dumbbell,
      isActive: true,
      items: [
        {
          title: "Bíceps",
          url: "#",
        },
        {
          title: "Costas",
          url: "#",
        },
        {
          title: "Abdômen",
          url: "#",
        },
      ],
    },
    {
      title: "Meus treinos",
      url: "#",
      icon: BookHeart,
    },
    {
      title: "Meus favoritos",
      url: "#",
      icon: Heart,
    },

  ],
  navSecondary: [
    {
      title: "Meu perfil",
      url: "#",
      icon: CircleUserRound,
    },
    {
      title: "Preferências",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({
  onSelect,
  ...props
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onSelect={onSelect} />
        <NavSecondary items={data.navSecondary} onSelect={onSelect} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
