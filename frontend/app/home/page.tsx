'use client'

import SearchBox from "@/components/searchBox"
import { useState } from "react"

export default function Welcome() {
  const [searchResults, setSearchResults] = useState<string | null>('')

  return (
    <div className="container mx-auto p-4 max-w-5xl">
        <h1 className="text-3xl font-bold">Job Search</h1>
        <SearchBox setSearchResults={setSearchResults}/>
        {searchResults && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {searchResults}
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde numquam alias sunt mollitia molestiae in illo dignissimos qui dolores, est optio! Ducimus quisquam hic aliquid, culpa qui neque reprehenderit perspiciatis eum aperiam dolor, consectetur dignissimos sequi eos distinctio, natus ad. Numquam sapiente quae voluptatem laudantium facilis quis ut enim alias unde non ipsa, tenetur suscipit optio autem id cum? Sunt tenetur doloremque nam nobis, ut officia, odio ullam impedit eveniet nihil distinctio vitae iure in? Incidunt tempora corporis, ullam aliquid dignissimos blanditiis ea voluptates sequi repudiandae assumenda illo totam nostrum vero dolores minus rerum neque est. Reiciendis porro voluptate magni.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde numquam alias sunt mollitia molestiae in illo dignissimos qui dolores, est optio! Ducimus quisquam hic aliquid, culpa qui neque reprehenderit perspiciatis eum aperiam dolor, consectetur dignissimos sequi eos distinctio, natus ad. Numquam sapiente quae voluptatem laudantium facilis quis ut enim alias unde non ipsa, tenetur suscipit optio autem id cum? Sunt tenetur doloremque nam nobis, ut officia, odio ullam impedit eveniet nihil distinctio vitae iure in? Incidunt tempora corporis, ullam aliquid dignissimos blanditiis ea voluptates sequi repudiandae assumenda illo totam nostrum vero dolores minus rerum neque est. Reiciendis porro voluptate magni.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde numquam alias sunt mollitia molestiae in illo dignissimos qui dolores, est optio! Ducimus quisquam hic aliquid, culpa qui neque reprehenderit perspiciatis eum aperiam dolor, consectetur dignissimos sequi eos distinctio, natus ad. Numquam sapiente quae voluptatem laudantium facilis quis ut enim alias unde non ipsa, tenetur suscipit optio autem id cum? Sunt tenetur doloremque nam nobis, ut officia, odio ullam impedit eveniet nihil distinctio vitae iure in? Incidunt tempora corporis, ullam aliquid dignissimos blanditiis ea voluptates sequi repudiandae assumenda illo totam nostrum vero dolores minus rerum neque est. Reiciendis porro voluptate magni. */}
          </pre>
        </div>
      )}
    </div>
  )
}