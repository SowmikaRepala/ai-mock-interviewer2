
"use client";
import React from 'react'
import { plans } from '@/public/utils/planData';
import { Button } from '@/components/ui/button';

export default function UpgradePage() {
  return (
    <div className="grid grid-cols md:grid-cols-2 gap-6 p-8">
      {plans.map((plan) => (
        <div key={plan.id} className="border rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold">{plan.name}</h2>
          <p className="text-xl font-semibold mt-2">
            {plan.cost === 0 ? "Free" : `$${plan.cost}/month`}
          </p>

          <ul className="mt-4 space-y-2">
            {plan.offering.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <span className={item.included ? "text-green-600" : "text-red-600"}>
                  {item.included ? "✔" : "✘"}
                </span>
                <span className="ml-2">{item.value}</span>
              </li>
            ))}
          </ul>

         
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a href={plan.paymentLink || "#"}>
                {plan.cost === 0 ? "Get Started" : "Subscribe"}
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
