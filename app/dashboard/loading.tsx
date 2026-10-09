import { Skeleton } from "@/components/ui/Feedback"

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
        ))}
      </div>
      
      <Skeleton className="flex-1 w-full min-h-[400px] rounded-xl" />
    </div>
  )
}
