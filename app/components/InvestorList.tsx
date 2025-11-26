"use client";

import React, { useState } from "react";

export default function InvestorList() {
  const [copied, setCopied] = useState(false);

  const content = `For-Profit Funding Strategy & Target Investor List

Project: A Digital Utility for Urban Africa (Three-Sided Marketplace for Bulk Water Delivery)
Entity Type: For-Profit (LLC or Public Benefit Corporation)
Founder: Ryan York (Experienced Tech/Ops Executive)
Funding Goal: $100,000 - $200,000 (Pre-Seed/Seed Round)`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const tier1Investors = [
    {
      investor: "MEST Africa",
      type: "Accelerator / Seed Fund",
      why: "Your #1 Target. Based in Accra, they are the premier gateway to the Ghanaian and West African tech ecosystem. They provide seed capital, intense operational support, and an unparalleled local network. Your seasoned founder profile would be a significant asset to their cohort.",
      approach: "An investment from MEST is a powerful signal that validates your venture for all subsequent investors. This should be your primary focus for applications. The hands-on nature of the program would be invaluable for on-the-ground execution.",
      score: "10/10"
    }
  ];

  const tier2Investors = [
    {
      investor: "Acumen",
      type: "Impact VC",
      why: "A pioneer in impact investing. While water is not an explicit top category in West Africa today, your model's strong alignment with their \"Dignified Jobs\" and \"Climate Resilience\" theses makes it a compelling fit. They understand challenging markets and back strong founders.",
      approach: "Your pitch must lead with the SME-empowerment angle: \"We are building a platform that creates dignified, reliable work for entrepreneurs.\" Frame the water problem as the massive market opportunity you are using to prove the model.",
      score: "8/10"
    },
    {
      investor: "FINCA Ventures",
      type: "Impact VC",
      why: "Their mandate explicitly includes WASH, financial inclusion, and SME empowerment. They are deeply experienced in emerging markets and understand the transition from cash-based to digital economies. Your three-sided marketplace model is a perfect fit.",
      approach: "Highlight the \"Supplier Empowerment\" features. Show how providing digital records and reliable income makes drivers and depots more bankable, creating a pathway to financial inclusion that FINCA deeply values.",
      score: "8/10"
    },
    {
      investor: "The GSMA Innovation Fund",
      type: "Grant / Seed Funding",
      why: "They fund for-profit, mobile-enabled solutions that serve underserved communities. Your platform is a textbook example. They frequently run funding rounds focused on climate resilience and essential services, for which you are a prime candidate.",
      approach: "This is non-dilutive or highly favorable capital. Actively monitor their website for new funding windows. The application process is rigorous, so emphasize the novelty and scalability of your mobile-first technology.",
      score: "8/10"
    }
  ];

  const tier3Investors = [
    {
      investor: "Launch Africa Ventures",
      type: "Seed VC",
      why: "As one of the continent's most active seed funds, they value experienced founders who can execute quickly on large, tangible problems. Your operational and tech background is a major asset. They understand marketplace dynamics.",
      approach: "The pitch must be sharp, data-driven, and focused on the path to scale. Emphasize the B2B GTM strategy to show how you're de-risking the \"chicken-and-egg\" problem and securing early revenue.",
      score: "7/10"
    },
    {
      investor: "Norrsken22",
      type: "Africa VC",
      why: "They invest in companies with the potential to become \"impact unicorns.\" Your grand vision to build the \"operating system for urban water\" aligns perfectly with their ambition. They are attracted to scalable tech that solves fundamental infrastructure challenges.",
      approach: "Sell the pan-African vision from day one. Accra is your launchpad for Lagos, Nairobi, and beyond. Your seasoned founder profile gives you the credibility needed to make such an ambitious vision believable.",
      score: "7/10"
    },
    {
      investor: "Katapult Climate",
      type: "Accelerator / VC",
      why: "This fund and accelerator program focuses specifically on climate solutions. Your venture is a clear \"climate adaptation\" play, building resilience to urban water scarcity. They can provide capital and critical sector-specific mentorship.",
      approach: "Emphasize the data component of your platform. Position it not just as a logistics tool, but as a data engine that will generate invaluable insights for climate-resilient city planning, a key area of interest for climate investors.",
      score: "7/10"
    },
    {
      investor: "Ghana Angel Investor Network (GAIN)",
      type: "Angel Network",
      why: "Local investors who understand the problem intimately and can unlock critical first relationships. An experienced foreign founder committed to solving a local problem is an attractive profile. Their introductions can be more valuable than their capital.",
      approach: "This is purely a relationship play. This is where your on-the-ground team is essential for building trust and connections within the local business community long before you make a formal ask.",
      score: "7/10"
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-0 right-0 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors z-10"
        title="Copy to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <div className="pt-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Investor List</h1>
        <p className="text-sm text-gray-500 mb-4">Version: 1.0 | Last Updated: 2025-11-25</p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-5 mb-8">
          <p className="font-semibold text-blue-900 mb-2">Project: A Digital Utility for Urban Africa</p>
          <p className="text-gray-700 mb-1">Three-Sided Marketplace for Bulk Water Delivery</p>
          <p className="text-gray-700 mb-1">Entity Type: For-Profit (LLC or Public Benefit Corporation)</p>
          <p className="text-gray-700 mb-1">Founder: Ryan York (Experienced Tech/Ops Executive)</p>
          <p className="text-gray-700">Funding Goal: $100,000 - $200,000 (Pre-Seed/Seed Round)</p>
        </div>

        <div className="space-y-8">
          {/* Executive Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Executive Overview: The Go-Forward Strategy</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              This is the refined and definitive target list for the pre-seed/seed round. Based on our analysis, we have removed later-stage infrastructure investors (WaterEquity, WaterConnect) to focus exclusively on funders who invest in asset-light, seed-stage, for-profit technology companies.
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-5">
              <p className="font-semibold text-green-900 mb-2">The Core Pitch to For-Profit Investors:</p>
              <p className="text-gray-700 italic">
                &quot;We are building a highly-scalable, profitable software platform that creates an efficient market for an essential utility. Our model is defensible through network effects and embedded SaaS, representing a multi-billion dollar opportunity to become the core operating system for private utilities in Africa&apos;s fastest-growing cities.&quot;
              </p>
            </div>
          </div>

          {/* Tier 1 */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Tier 1: The Ecosystem Entry Point (Highest Priority)</h2>
            <p className="mb-4 text-gray-700">
              Success in Ghana starts with local credibility and network access. This is your most critical first step.
            </p>

            <h3 className="text-xl font-bold mb-3 text-green-900">MEST Africa - Your #1 Target</h3>
            <p className="mb-4 text-gray-700 italic">Based in Accra, they are the premier gateway to the Ghanaian and West African tech ecosystem.</p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white border rounded-lg">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-300 p-3 text-left font-bold w-48">Investor/Source</th>
                    <th className="border border-gray-300 p-3 text-left font-bold w-32">Type</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Why They&apos;re a Good Fit</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Considerations & Approach</th>
                    <th className="border border-gray-300 p-3 text-left font-bold w-24">Fit Score</th>
                  </tr>
                </thead>
                <tbody>
                  {tier1Investors.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 p-3 font-semibold text-gray-900">{row.investor}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.type}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-700">{row.why}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-700">{row.approach}</td>
                      <td className="border border-gray-300 p-3 text-center font-bold text-green-700">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tier 2 */}
          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-900">3. Tier 2: The Sweet Spot (High-Alignment Impact VCs)</h3>
            <p className="mb-4 text-gray-700 italic">These investors are structured to provide patient, strategic capital to for-profit companies delivering fundamental social and environmental returns. They are the ideal partners for your mission and business model.</p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white border rounded-lg">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-300 p-3 text-left font-bold w-48">Investor/Source</th>
                    <th className="border border-gray-300 p-3 text-left font-bold w-32">Type</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Why They&apos;re a Good Fit</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Considerations & Approach</th>
                    <th className="border border-gray-300 p-3 text-left font-bold w-24">Fit Score</th>
                  </tr>
                </thead>
                <tbody>
                  {tier2Investors.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 p-3 font-semibold text-gray-900">{row.investor}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.type}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-700">{row.why}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-700">{row.approach}</td>
                      <td className="border border-gray-300 p-3 text-center font-bold text-blue-700">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tier 3 */}
          <div>
            <h3 className="text-xl font-bold mb-3 text-purple-900">4. Tier 3: The Scalers (Commercially-Focused Africa VCs)</h3>
            <p className="mb-4 text-gray-700 italic">These VCs are looking for the next African tech unicorn. Your pitch to them should focus on market size, scalability, and defensibility, with the impact story serving as a powerful differentiator.</p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white border rounded-lg">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border border-gray-300 p-3 text-left font-bold w-48">Investor/Source</th>
                    <th className="border border-gray-300 p-3 text-left font-bold w-32">Type</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Why They&apos;re a Good Fit</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Considerations & Approach</th>
                    <th className="border border-gray-300 p-3 text-left font-bold w-24">Fit Score</th>
                  </tr>
                </thead>
                <tbody>
                  {tier3Investors.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 p-3 font-semibold text-gray-900">{row.investor}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.type}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-700">{row.why}</td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-700">{row.approach}</td>
                      <td className="border border-gray-300 p-3 text-center font-bold text-purple-700">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
