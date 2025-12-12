"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPostById, BlogPost } from "@/app/actions/blog"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostPage() {
  const params = useParams()
  const id = params.id as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const result = await getBlogPostById(id)
      setPost(result)
      setLoading(false)
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
          <article className="max-w-4xl mx-auto text-white">
            <header className="mb-8">
              <Skeleton className="w-3/4 h-10 mb-4 bg-gray-400" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-20 h-4 bg-gray-400" />
                <Skeleton className="w-4 h-4 bg-gray-400" />
                <Skeleton className="w-16 h-4 bg-gray-400" />
              </div>
            </header>
            <div className="mb-8">
              <Skeleton className="w-full h-64 md:h-96 rounded-2xl bg-gray-400" />
            </div>
            <Skeleton className="w-full h-6 mb-4 bg-gray-400" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4 bg-gray-400" />
              <Skeleton className="w-full h-4 bg-gray-400" />
              <Skeleton className="w-3/4 h-4 bg-gray-400" />
              <Skeleton className="w-full h-4 bg-gray-400" />
              <Skeleton className="w-full h-4 bg-gray-400" />
              <Skeleton className="w-1/2 h-4 bg-gray-400" />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-white">
            <p className="text-center">Artículo no encontrado.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <article className="max-w-4xl mx-auto text-white">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span>Por {post.author}</span>
              <span>•</span>
              <span>{post.createdAt.toLocaleDateString()}</span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-8">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-2xl"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-xl text-white/80 mb-8 italic">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg prose-invert max-w-none"
            style={{ fontFamily: 'Helvetica, sans-serif' }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
          />
        </article>
      </main>

      <Footer />
    </div>
  )
}