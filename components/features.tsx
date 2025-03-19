import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Shield, Zap, Cloud, Code, Moon, Globe } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Upload & Convert",
      description: "Upload files and select your desired output format. Support for batch conversion coming soon.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download & Share",
      description: "Download your converted files instantly or share them via email.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Processing",
      description: "Your files are processed securely and deleted after conversion.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Conversion",
      description: "Optimized conversion process for quick results.",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Integration",
      description: "Integration with cloud storage services coming soon.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "API Access",
      description: "Developer API for integrating conversions into your apps.",
    },
    {
      icon: <Moon className="h-6 w-6" />,
      title: "Dark Mode",
      description: "Comfortable viewing experience in low-light environments.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Language",
      description: "Support for multiple languages coming soon.",
    },
  ]

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="p-2 w-fit rounded-md bg-primary/10 text-primary mb-2">{feature.icon}</div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

