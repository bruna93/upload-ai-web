import { Github } from "lucide-react"
import { ModeToggle } from "./ui/mode-toggle"
import { Button } from "./ui/button"

export const Header = () => {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <Button className="flex items-center justify-center gap-1">
          <Github className="w-4 h-4" />

          Github
        </Button>
      </div>
    </div>
  )
}