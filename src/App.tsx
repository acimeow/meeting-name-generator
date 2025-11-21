import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MeetingNameGenerator from './components/MeetingNameGenerator'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Meeting Name Generator
            </h1>
            <p className="text-xl text-gray-600">
              Transform boring meetings into memorable moments
            </p>
          </header>
          <MeetingNameGenerator />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
