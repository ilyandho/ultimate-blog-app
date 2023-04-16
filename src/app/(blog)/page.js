import Image from 'next/image'
import { Inter } from 'next/font/google'
import EditorComponent from '../../components/editor'

const inter = Inter({ subsets: ['latin'] })

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     He;d <EditorComponent/>    
   </main>
  )
}
