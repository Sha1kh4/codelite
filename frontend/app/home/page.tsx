'use client'

import SearchBox from "@/components/searchBox"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function Welcome() {
  const [searchResults, setSearchResults] = useState({
    suggestions: [],
    missing_skills: [],
    link_to_course_searches: [],
    link_to_youtube_searches: []
  })

  const [activeTab, setActiveTab] = useState('suggestions')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'suggestions':
        return (
          <ul className="list-disc ml-5">
            {searchResults.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )
      case 'missing_skills':
        return (
          <ul className="list-disc ml-5">
            {searchResults.missing_skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )
      case 'courses':
        return (
          <ul className="list-disc ml-5">
            {searchResults.link_to_course_searches.map((s, i) => (
              <li key={i} className="underline text-blue-800">
                <Link href={`https://www.classcentral.com/search?q=${s}`} target="_blank">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        )
      case 'youtube':
        return (
          <ul className="list-disc ml-5">
            {searchResults.link_to_youtube_searches.map((s, i) => (
              <li key={i} className="underline text-blue-800">
                <Link href={`https://www.youtube.com/results?search_query=${s}`} target="_blank">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="container h-screen border mx-auto p-8 flex flex-col md:flex-row">
      <div>
        <h1 className="text-5xl font-bold text-sky-600">CareerFit AI</h1>
        <SearchBox setSearchResults={setSearchResults} />
      </div>
      <div className="md:pl-8 max-sm:border-t md:border-l border-black flex-1 w-full">
        {searchResults.suggestions.length > 0 && (
          <div className="h-full pb-12">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="mb-4">
              <Button
                variant={'outline'}
                className={`${activeTab === 'suggestions' ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
                onClick={() => setActiveTab('suggestions')}
              >
                Suggestions
              </Button>
              <Button
                variant={'outline'}
                className={`px-4 py-2 mr-2 ${activeTab === 'missing_skills' ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
                onClick={() => setActiveTab('missing_skills')}
              >
                Missing Skills
              </Button>
              <Button
                variant={'outline'}
                className={`px-4 py-2 mr-2 ${activeTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
                onClick={() => setActiveTab('courses')}
              >
                Courses
              </Button>
              <Button
                variant={'outline'}
                className={`px-4 py-2 ${activeTab === 'youtube' ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
                onClick={() => setActiveTab('youtube')}
              >
                YouTube
              </Button>
            </div>
            <pre className="whitespace-pre-wrap border bg-white p-8 rounded-3xl h-full overflow-x-auto">
              {renderTabContent()}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
