import { FileUploader } from "@/components/file-uploader"
import { Features } from "@/components/features"
import { SupportedFormats } from "@/components/supported-formats"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Universal File Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Convert between various file formats with ease. Upload your file and select the desired output format.
          </p>
        </header>

        <main>
          <FileUploader />
          <SupportedFormats />
          <Features />
        </main>

        <footer className="mt-20 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Universal File Converter. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

