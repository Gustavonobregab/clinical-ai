import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
