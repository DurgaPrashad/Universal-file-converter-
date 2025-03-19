"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { convertFile } from "@/lib/convert-file"
import { Upload, FileDown, RefreshCw, CheckCircle, AlertCircle, FileType } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCompatibleFormats } from "@/lib/format-utils"
import { toast } from "@/hooks/use-toast"

type ConversionStatus = "idle" | "uploading" | "converting" | "completed" | "error"

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>("")
  const [compatibleFormats, setCompatibleFormats] = useState<string[]>([])
  const [status, setStatus] = useState<ConversionStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile) {
      setFile(selectedFile)
      const formats = getCompatibleFormats(selectedFile.name)
      setCompatibleFormats(formats)
      setOutputFormat(formats.length > 0 ? formats[0] : "")
      setStatus("idle")
      setConvertedFileUrl(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      const formats = getCompatibleFormats(droppedFile.name)
      setCompatibleFormats(formats)
      setOutputFormat(formats.length > 0 ? formats[0] : "")
      setStatus("idle")
      setConvertedFileUrl(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleConvert = async () => {
    if (!file || !outputFormat) return

    try {
      setStatus("uploading")
      setProgress(20)

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      setStatus("converting")

      // Perform the conversion
      const result = await convertFile(file, outputFormat)

      clearInterval(progressInterval)
      setProgress(100)
      setStatus("completed")
      setConvertedFileUrl(result.url)

      toast({
        title: "Conversion completed",
        description: "Your file has been successfully converted.",
      })
    } catch (error) {
      setStatus("error")
      toast({
        title: "Conversion failed",
        description: "There was an error converting your file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFile(null)
    setOutputFormat("")
    setCompatibleFormats([])
    setStatus("idle")
    setProgress(0)
    setConvertedFileUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const downloadFile = () => {
    if (convertedFileUrl) {
      const link = document.createElement("a")
      link.href = convertedFileUrl
      link.download = `converted.${outputFormat.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const renderStatusIcon = () => {
    switch (status) {
      case "uploading":
      case "converting":
        return <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return <Upload className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "converting":
        return "Converting..."
      case "completed":
        return "Conversion completed!"
      case "error":
        return "Conversion failed"
      default:
        return "Drag & drop your file here or click to browse"
    }
  }

  return (
    <Card className="p-6 max-w-3xl mx-auto mb-12 shadow-lg">
      <div className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            status === "completed"
              ? "border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
              : status === "error"
                ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700"
                : "border-gray-300 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
          } transition-colors duration-200`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input type="file" className="hidden" onChange={handleFileChange} ref={fileInputRef} />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">{renderStatusIcon()}</div>

            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">{getStatusText()}</p>

              {file && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <FileType className="h-4 w-4 mr-1" />
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {status === "idle" && (
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Select File
              </Button>
            )}
          </div>
        </div>

        {/* Conversion Options */}
        {file && (
          <div className="space-y-4">
            {status !== "completed" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Input Format
                    </label>
                    <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      {file.name.split(".").pop()?.toUpperCase() || "Unknown"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Output Format
                    </label>
                    <Select
                      value={outputFormat}
                      onValueChange={setOutputFormat}
                      disabled={status === "uploading" || status === "converting"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {compatibleFormats.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(status === "uploading" || status === "converting") && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{status === "uploading" ? "Uploading" : "Converting"}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    disabled={status === "uploading" || status === "converting"}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleConvert}
                    disabled={!outputFormat || status === "uploading" || status === "converting"}
                  >
                    {status === "uploading" || status === "converting" ? "Converting..." : "Convert File"}
                  </Button>
                </div>
              </>
            )}

            {status === "completed" && convertedFileUrl && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-green-800 dark:text-green-300 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Your file has been successfully converted to {outputFormat.toUpperCase()}
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={resetForm}>
                    Convert Another File
                  </Button>
                  <Button onClick={downloadFile}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Converted File
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

