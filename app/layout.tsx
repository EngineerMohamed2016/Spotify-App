import './globals.css'
import { Oleo_Script } from 'next/font/google'
import { CntxProvider } from '@/contextApi/Context'
import SideBar from '@/components/SideBar'
import HiddenSideBar from '@/components/HiddenSideBar'
import AudioPlayer from '@/components/AudioPlayer'
const Leo = Oleo_Script({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Spotify',
  description: 'Spotify App, You can find your favourite artists, albums and tracks.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={Leo.className}>
        <CntxProvider>
          <div className='flex'>

            <div className='hidden md:block md:w-1/4 h-screen py-3 px-3 relative'>
              <SideBar />
            </div>

            <div className='relative w-full lg:w-3/4 h-screen overflow-y-auto'>
              {children}
            </div>

          </div>

          {/* flow */}
          <>
            <HiddenSideBar />
            <AudioPlayer />
          </>
        </CntxProvider>
      </body>
    </html>
  )
}
