'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Upload, FileText, User } from 'lucide-react'

export default function ResumePicker() {
  const [method, setMethod] = useState<'upload' | 'manual'>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [manualData, setManualData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: ''
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file.",
        variant: "destructive"
      })
    }
  }

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setManualData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (method === 'upload' && !file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF resume.",
        variant: "destructive"
      })
      return
    }
    
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Resume submitted",
      description: method === 'upload' ? "Your resume has been uploaded successfully." : "Your resume information has been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Submission</h1>
      
      <RadioGroup className="flex justify-center space-x-4 mb-8" onValueChange={(value) => setMethod(value as 'upload' | 'manual')} defaultValue="upload">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upload" id="upload" />
          <Label htmlFor="upload">Upload Resume</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="manual" id="manual" />
          <Label htmlFor="manual">Enter Manually</Label>
        </div>
      </RadioGroup>

      <form onSubmit={handleSubmit} className="space-y-6">
        {method === 'upload' ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="resume"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf"
            />
            <label htmlFor="resume" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-lg font-semibold mb-2">
                  {file ? file.name : 'Click to upload your resume (PDF)'}
                </span>
                <span className="text-sm text-gray-500">
                  {file ? 'File selected' : 'or drag and drop here'}
                </span>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={manualData.name} onChange={handleManualChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={manualData.email} onChange={handleManualChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={manualData.phone} onChange={handleManualChange} required />
            </div>
            <div>
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea id="experience" name="experience" value={manualData.experience} onChange={handleManualChange} required />
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          {method === 'upload' ? 'Upload Resume' : 'Submit Information'}
        </Button>
      </form>
    </div>
  )
}