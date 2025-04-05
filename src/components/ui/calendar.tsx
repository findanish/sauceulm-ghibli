"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-[#f0e6c9] rounded-lg border-2 border-[#8b7e57] shadow-md", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "relative flex justify-center items-center h-10",
        caption_label: "text-base font-bold text-[#5c4c29]",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-100 hover:opacity-80 text-[#5c4c29] text-lg font-bold flex items-center justify-center"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex w-full justify-between",
        head_cell: "text-[#5c4c29] font-bold text-center w-9",
        row: "flex w-full mt-2 justify-between",
        cell: "text-center relative p-0 w-9",
        day: cn(
          "h-9 w-9 p-0 font-bold text-[#5c4c29] hover:bg-[#e8deb8] aria-selected:opacity-100 mx-auto flex items-center justify-center"
        ),
        day_selected: "bg-[#8b7e57] text-[#f0e6c9] hover:bg-[#8b7e57] hover:text-[#f0e6c9]",
        day_today: "bg-[#e8deb8] text-[#5c4c29] font-bold border-2 border-[#8b7e57]",
        day_outside: "text-[#8b7e57]/50",
        day_disabled: "text-[#8b7e57]/40 opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <span className="text-[#5c4c29] font-bold">{'<'}</span>,
        IconRight: () => <span className="text-[#5c4c29] font-bold">{'>'}</span>,
      }}
      {...props}
    />
  )
}

export { Calendar }
