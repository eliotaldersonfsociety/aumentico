"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BlogCard from "@/components/BlogCard"
import { getBlogPosts, BlogPost } from "@/app/actions/blog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

function BlogContent() {
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams.get("page") || "1", 10)
  const [page, setPage] = useState(initialPage)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const result = await getBlogPosts(10)
      setPosts(result)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set("page", newPage.toString())
    window.history.pushState({}, "", url)
  }

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-4">
              <Skeleton className="w-full h-48 mb-4 bg-gray-400" />
              <Skeleton className="w-3/4 h-6 mb-2 bg-gray-400" />
              <Skeleton className="w-full h-4 mb-1 bg-gray-400" />
              <Skeleton className="w-1/2 h-4 bg-gray-400" />
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice((page - 1) * 10, page * 10).map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                summary={post.excerpt || post.content.substring(0, 150) + "..."}
                image={post.imageUrl || "/marketing.jpg"}
                date={post.createdAt.toLocaleDateString()}
                url={`/blog/${post.id}`}
              />
            ))}
          </div>

          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && handlePageChange(page - 1)}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < Math.ceil(posts.length / 10) && handlePageChange(page + 1)}
                    className={page >= Math.ceil(posts.length / 10) ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <p className="text-center text-white/80">
          No se pudieron cargar los artículos. Intenta más tarde.
        </p>
      )}
    </>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 p-6">
            Blog de Marketing Digital
          </h1>

          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-4">
                  <Skeleton className="w-full h-48 mb-4 bg-gray-400" />
                  <Skeleton className="w-3/4 h-6 mb-2 bg-gray-400" />
                  <Skeleton className="w-full h-4 mb-1 bg-gray-400" />
                  <Skeleton className="w-1/2 h-4 bg-gray-400" />
                </div>
              ))}
            </div>
          }>
            <BlogContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
