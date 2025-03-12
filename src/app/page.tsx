// import { TikTokSidebar } from "@/components/layouts/app-sidebar"
// import { VideoFeed } from "@/components/video-feed/video-feed"
import { supabase } from '../lib/supabase'
async function fetchData() {
  const { data, error } = await supabase
    .from('test')
    .select('*')
  console.log(data)
  if (error) console.error('Error fetching data:', error)
  else return data
}
export default async function Home() {
  await fetchData()
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-black">
      {/* <TikTokSidebar />
      <main className="flex-1 overflow-hidden">
        <VideoFeed />
      </main> */}
    </div>
  )
}

