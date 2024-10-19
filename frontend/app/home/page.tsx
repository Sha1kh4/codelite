'use client'

import SearchBox from "@/components/searchBox"
import { useState } from "react"

export default function Welcome() {
  const [searchResults, setSearchResults] = useState({
    suggestions: [],
    missing_skills: [],
    link_to_course_searches: [],
    link_to_youtube_searches: []
  })

  return (
    <div className="container  mx-auto p-8 flex flex-col md:flex-row">
      <div className="">
        <h1 className="text-5xl font-bold text-sky-600">CareerFit AI</h1>
        <SearchBox setSearchResults={setSearchResults} />
      </div>
      <div className="md:pl-8 max-sm:border-t md:border-l border-black flex-1 w-full h-screen overflow-y-scroll">
        {searchResults.suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <pre className="whitespace-pre-wrap border bg-white p-8 rounded-3xl overflow-x-auto">
              Suggestion: <br />
              <ul className=" list-disc ml-5">{searchResults.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}</ul> <br /><br />
              Missing Skills: <br />
              <ul className=" list-disc ml-5">{searchResults.missing_skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}</ul> <br /><br />
              Suggested Course: <br />
              <ul className=" list-disc ml-5">{searchResults.link_to_course_searches.map((s, i) => (
                <li>{s}</li>
              ))}</ul> <br /><br />
              Youtube Videos you can watch: <br /><ul className=" list-disc ml-5">{searchResults.link_to_youtube_searches.map((s, i) => (
                <li>{s}</li>
              ))}</ul><br /><br />
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}