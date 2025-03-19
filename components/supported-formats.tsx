import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function SupportedFormats() {
  const formatCategories = [
    {
      id: "documents",
      label: "Documents",
      formats: [
        { from: "PDF", to: ["DOCX", "PPT", "TXT", "HTML"] },
        { from: "DOCX", to: ["PDF", "TXT", "HTML"] },
        { from: "PPT", to: ["PDF", "PPTX"] },
        { from: "TXT", to: ["PDF", "DOCX", "HTML"] },
        { from: "HTML", to: ["PDF", "DOCX", "TXT", "MARKDOWN"] },
        { from: "MARKDOWN", to: ["HTML", "PDF", "DOCX"] },
      ],
    },
    {
      id: "spreadsheets",
      label: "Spreadsheets",
      formats: [
        { from: "XLSX", to: ["CSV", "PDF", "JSON"] },
        { from: "CSV", to: ["XLSX", "JSON", "XML"] },
        { from: "JSON", to: ["CSV", "XML", "YAML"] },
        { from: "XML", to: ["JSON", "CSV", "YAML"] },
      ],
    },
    {
      id: "images",
      label: "Images",
      formats: [
        { from: "JPG", to: ["PNG", "WEBP", "GIF", "BMP"] },
        { from: "PNG", to: ["JPG", "WEBP", "GIF", "BMP"] },
        { from: "WEBP", to: ["JPG", "PNG", "GIF"] },
        { from: "GIF", to: ["JPG", "PNG", "WEBP"] },
        { from: "SVG", to: ["PNG", "JPG"] },
      ],
    },
    {
      id: "audio-video",
      label: "Audio & Video",
      formats: [
        { from: "MP4", to: ["MP3", "WAV", "AVI", "MOV"] },
        { from: "MP3", to: ["WAV", "OGG", "FLAC"] },
        { from: "WAV", to: ["MP3", "OGG", "FLAC"] },
        { from: "AVI", to: ["MP4", "MOV"] },
        { from: "MOV", to: ["MP4", "AVI"] },
      ],
    },
  ]

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Supported Formats</h2>

      <Card className="border border-gray-200 dark:border-gray-800">
        <CardContent className="pt-6">
          <Tabs defaultValue="documents">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              {formatCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {formatCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.formats.map((format, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="font-medium text-lg mb-2">{format.from}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Convert to:</div>
                      <div className="flex flex-wrap gap-2">
                        {format.to.map((toFormat) => (
                          <span key={toFormat} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                            {toFormat}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

