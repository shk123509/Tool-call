"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for hobbyists and students starting out.",
      features: [
        "Up to 5 Projects",
        "Basic Analytics",
        "Community Support",
        "1GB Cloud Storage",
        "Public API Access",
      ],
      buttonText: "Get Started for Free",
      isPopular: false,
      href: "/dash", // Directs to dashboard
    },
    {
      name: "Pro",
      price: isAnnual ? "19" : "29",
      description: "Best for professional developers and freelancers.",
      features: [
        "Unlimited Projects",
        "Advanced Analytics",
        "24/7 Priority Support",
        "20GB Cloud Storage",
        "Custom Domains",
        "Private Repositories",
      ],
      buttonText: "Upgrade to Pro",
      isPopular: true,
      href: "http://openai.com/api/pricing/", // In a real app, this might go to /checkout
    },
    {
      name: "Enterprise",
      price: "99",
      description: "Scalable solutions for large teams and companies.",
      features: [
        "Team Management",
        "Dedicated Account Manager",
        "SSO & Advanced Security",
        "Unlimited Storage",
        "Custom Contracts",
        "White-label Branding",
      ],
      buttonText: "Contact Sales",
      isPopular: false,
      href: "https://ai.google.dev/gemini-api/docs/pricing?utm_source=google&utm_medium=cpc&utm_campaign=Cloud-SS-DR-AIS-FY26-global-gsem-1713578&utm_content=text-ad&utm_term=KW_gemini%20api&gad_source=1&gad_campaignid=23417416052&gbraid=0AAAAACn9t64mq-NfBNwig20LsHVVGdu1X&gclid=CjwKCAiA7LzLBhAgEiwAjMWzCNTNQ_tg8jUkiKN0nxu3xu1CCKJS_RNjVax6CtQf66tFYTEqOo4diBoC8NoQAvD_BwE",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Plans for every stage of growth.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start for free and scale as you grow. No hidden costs.
          </p>

          {/* Billing Toggle */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 flex items-center bg-indigo-600 rounded-full p-1 transition-colors duration-300 focus:outline-none"
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>
              Yearly <span className="text-green-500 font-semibold ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-8 bg-white rounded-3xl shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.isPopular ? "border-indigo-600 ring-2 ring-indigo-600 ring-opacity-50" : "border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Zap size={14} fill="white" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="ml-1 text-xl font-medium text-gray-500">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <Check className="text-indigo-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <Link href={plan.href} className="w-full">
                <button
                  className={`w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold transition-all duration-200 ${
                    plan.isPopular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-200"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Support Info */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            All plans include a 14-day money-back guarantee. <br className="hidden sm:block" />
            Questions? <span className="text-indigo-600 font-semibold cursor-pointer underline">Talk to our support team</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;