'use client'
import React from 'react'
import PlanData from '../../../utils/planData'
import { useUser } from '@clerk/nextjs'

function Upgrade() {
  const { user } = useUser()

  return (
    <div className="p-10 h-screen">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">Upgrade</h2>
        <p className="text-neutral-600 text-sm text-center mt-2">
          Upgrade to monthly plan to access unlimited interview
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:items-center md:gap-8">
          {PlanData.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12"
            >
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  {item.duration}
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {item.price == 0 ? item.price : item.price.toFixed(2)}$
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /{item.duration}
                  </span>
                </p>
              </div>

              {item.offering && item.offering.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {item.offering.map((offer, offerIndex) => (
                    <li
                      key={offerIndex}
                      className="flex items-center gap-1 text-nowrap"
                    >
                      <p className="text-gray-700">{offer.value}</p>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={
                  item.price === 0
                    ? undefined
                    : item.link +
                      '?prefilled_email=' +
                      user?.primaryEmailAddress?.emailAddress
                }
                target={item.price === 0 ? '_self' : '_blank'}
                className={`mt-8 block rounded-full border bg-white px-12 py-3 text-center text-sm font-medium ${item.price === 0 ? 'text-neutral-400' : ' text-primary hover:ring-1 hover:ring-pink-700 focus:outline-none focus:ring active:text-primary border-primary'}`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Upgrade
