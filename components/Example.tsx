/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { RepositoryOption } from './RepositoryOption'
import {
  ArrowTurnDownLeftIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid'
import { clsxm } from '@zolplay/clsxm'

export default function Example() {
  const [open, setOpen] = React.useState(true)

  const [rawQuery, setRawQuery] = React.useState('')
  // const query = () => rawQuery.toLowerCase().replace(/^[#>]/, '')

  const [items, setItems] = React.useState<Repository[]>([])

  const getSearchRepositories = async (q: string | null) => {
    const result = await fetch(`/api/search?q=${q}`)
    const { items }: APIResponse = await result.json()
    setItems(items)
  }

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     getSearchRepositories(rawQuery || null)
  //   }, 300)
  // }, [rawQuery])

  return (
    <Transition
      show={open}
      as={React.Fragment}
      afterLeave={() => setRawQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={clsxm(
                'mx-auto max-w-xl transform divide-y divide-gray-500 overflow-hidden rounded-2xl shadow-slate-300/10 bg-slate-900/70 shadow-2xl  transition-all',
                'backdrop-blur-xl backdrop-filter'
              )}
            >
              <Combobox
                value={rawQuery}
                onChange={(item) => {
                  console.info('You have selected', item, typeof item)
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between">
                    <ComboboxInput
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-0"
                      autoComplete="off"
                      placeholder="Search GitHub repos..."
                      onChange={(event) => setRawQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          getSearchRepositories(rawQuery)
                          setRawQuery('')
                        }
                      }}
                    />
                    <ArrowTurnDownLeftIcon className="absolute top-4 right-4 size-4 text-gray-500" />
                  </div>
                </div>

                <ComboboxOptions
                  static
                  className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                >
                  <li className="list-none">
                    <h2 className="text-xs font-semibold text-gray-200">
                      Repositories
                    </h2>
                    <ul className="-mx-4 mt-2 text-sm text-gray-700 space-y-0.5">
                      {items.map((item) => (
                        <RepositoryOption key={item.id} item={item} />
                      ))}
                      {/* <RepositoryOption />
                      <RepositoryOption />
                      <RepositoryOption /> */}
                    </ul>
                  </li>
                </ComboboxOptions>
                <span className="flex flex-wrap items-center bg-slate-900/20 py-2.5 px-4 text-xs text-gray-400">
                  <FaceSmileIcon className="w-4 h-4 mr-1" />
                  Welcome to Zolplay&apos;s React Interview Challenge.
                </span>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
