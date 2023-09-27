import { Header } from "./components/header"
import { ThemeProvider } from "./components/theme-provider"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Separator } from "./components/ui/separator"
import { Slider } from "./components/ui/slider"
import { Textarea } from "./components/ui/textarea"
import { Wand2 } from "lucide-react"
import { VideoInputForm } from "./components/video-input-form"
import { PromptSelect } from "./components/prompt-select"
import { useState } from "react"
import { useCompletion } from "ai/react"

export const App = () => {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-6 flex gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex flex-col gap-4 flex-1 justify-stretch">
              <Textarea
                className="resize-none p-5 leading-relaxed h-full"
                placeholder="Inclua o prompt para a IA..."
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                className="resize-none p-5 leading-relaxed h-full"
                placeholder="Resultado gerado pela IA..."
                readOnly
                value={completion}
              />
            </div>

            <p>
              Lembre-se: você pode utilizar a variável <code className="text-primary">{'{transcription}'}</code> no seu
              prompt para adicionar o conteúdo da transcrição do vídeo
              selecionado.
            </p>
          </div>

          <aside className="w-80 flex flex-col gap-6">
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label>Prompt</Label>

                <PromptSelect onPromptSelected={setInput} />
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label>Modelo</Label>

                <Select defaultValue="gpt3.5" disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-xs text-muted-foreground italic">
                  Você poderá customizar essa opção em breve
                </span>
              </div>

              <Separator />

              <div className="w-full flex flex-col gap-4">
                <Label>Temperatura</Label>

                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={value => setTemperature(value[0])}
                />

                <span className="text-xs text-muted-foreground italic leading-relaxed">
                  Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
                </span>
              </div>

              <Separator />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                Executar
                <Wand2 className="w-4 h-4" />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  )
}