"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsData {
  market_trends: string;
  predictions: string;
  skill_demand: {
    emerging_skills: string[];
    high_demand_skills: string[];
  };
  top_hiring_companies: {
    company_name: string;
    description: string;
  }[];
}

export default function Analytics() {
  const [jobName, setJobName] = useState("");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/analytics?jobs=${jobName}`
      );
      setAnalyticsData(response.data);
    } catch (err) {
      setError("Failed to fetch analytics data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-5xl font-bold text-sky-600 text-center my-10">
        CareerFit AI
      </h1>
      <h1 className="text-2xl font-bold mb-4 text-center">Career Analytics</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            placeholder="Enter job name"
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Analyze"}
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {analyticsData && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analyticsData.market_trends}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{analyticsData.predictions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Emerging Skills</h3>
              <ul className="list-disc list-inside mb-4">
                {analyticsData.skill_demand.emerging_skills.map(
                  (skill, index) => (
                    <li key={index}>{skill}</li>
                  )
                )}
              </ul>
              <h3 className="font-semibold mb-2">High Demand Skills</h3>
              <ul className="list-disc list-inside">
                {analyticsData.skill_demand.high_demand_skills.map(
                  (skill, index) => (
                    <li key={index}>{skill}</li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Hiring Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {analyticsData.top_hiring_companies.map((company, index) => (
                  <li key={index}>
                    <strong>{company.company_name}</strong> -{" "}
                    {company.description}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
