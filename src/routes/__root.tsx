/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

const fakeCity = [
  'New York',
  'Copenahgen',
  'Venice',

]
const fakeImages = [
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'Bed Scanner finds the best beds!',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [location, setLocation] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [guests, setGuests] = React.useState(1)

  const handleScan = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowModal(true)
    }, 2000)
  }

return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-gray-100 flex flex-col">
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">No search results!</h2>
              <p className="mb-4">Fuck you George 🖕</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bed Scanner</h1>
        </header>

        {/* Hero Search Section */}
        <main className="flex-1">
          <section
            className="relative bg-cover bg-center h-[60vh]"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
            
          >
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-3xl">
                <form className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 mb-1">Where to?</label>
                    <input
                      type="text"
                      placeholder="Explore..."
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={e => setGuests(Number(e.target.value))}
                      className="w-full border rounded px-3 py-2"
                    >
                      {[1,2,3,4,5,6].map(n => (
                        <option key={n} value={n}>{n} guest{n>1?'s':''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleScan}
                      className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded"
                    >
                      {loading ? (
                        <span className="animate-spin inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent" />
                      ) : (
                        'Search'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Featured Section */}
          <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0,1,2].map(i => (
                <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col">
                  <img
                    src={fakeImages[i]}
                    alt={`Spot ${i}`}
                    className="rounded mb-4 object-cover h-40 w-full"
                  />
                  <h3 className="text-lg font-semibold mb-2">{fakeCity[i]}</h3>
                  <button className="mt-auto bg-green-500 hover:bg-green-700 text-white py-2 rounded">
                    Explore
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />      
      </body>
    </html>
  )
}
