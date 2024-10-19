'use client'

import { useState, useCallback } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload } from 'lucide-react'

export default function SearchBox({ setSearchResults }: any) {
  const [inputType, setInputType] = useState<'resume' | 'skills'>('resume')
  const [resume, setResume] = useState<File | null>(null)
  const [skills, setSkills] = useState('')
  const [jobType, setJobType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setResume(event.target.files[0])
    }
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (inputType === 'resume' && resume) {
        formData.append('file', resume)
      } else if (inputType === 'skills') {
        formData.append('skills', skills)
      }
    //   formData.append('jobType', jobType)

      const response = await axios.post(inputType === 'resume' ? 'http://192.168.0.137:5000/upload_file' : 'http://192.168.0.137:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSearchResults(JSON.stringify(response.data, null, 2))
    } catch (error) {
      console.error('Error during job search:', error)
      setSearchResults('An error occurred during the search. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="w-full space-y-6 mb-8">
        <RadioGroup
          value={inputType}
          onValueChange={(value) => setInputType(value as 'resume' | 'skills')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="resume" id="resume-option" />
            <Label htmlFor="resume-option">Upload Resume</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="skills" id="skills-option" />
            <Label htmlFor="skills-option">Enter Skills</Label>
          </div>
        </RadioGroup>
        <div className="space-y-4">
          {inputType === 'resume' ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center max-w-60">
              <input
                type="file"
                id="resume"
                className="hidden"
                onChange={handleResumeUpload}
                accept=".pdf"
              />
              <label htmlFor="resume" className="cursor-pointer">
                <div className="flex gap-5 items-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <div className='flex flex-col'>
                  <span className=" font-semibold mb-2">
                    {resume ? resume.name : 'Click to upload your resume (PDF)'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {resume ? 'resume selected' : 'or drag and drop here'}
                  </span></div>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Enter your skills, separated by commas"
                className="min-h-[100px]"
              />
            </div>
          )}
          {/* <div className="space-y-2">
            <Label htmlFor="jobType">Job Type / Name</Label>
            <Input
              id="jobType"
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="Enter job type or name"
            />
          </div> */}
          <Button
            onClick={handleSearch}
            disabled={isLoading || (inputType === 'resume' && !resume) || (inputType === 'skills' && !skills) || !jobType}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Searching...' : 'Search Jobs'}
          </Button>
        </div>
      </div>

      
    </div>
  )
}