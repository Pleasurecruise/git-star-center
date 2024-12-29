"use client"

import {ModeToggle} from "@/components/layout/mode-toggle.tsx";

export function NavActions() {
    return (
        <div className="flex items-center gap-2 text-sm">
            <ModeToggle />
        </div>
    )
}
