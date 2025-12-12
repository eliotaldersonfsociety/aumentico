"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getBlogPosts, deleteBlogPost, BlogPost } from "@/app/actions/blog"
import { BlogForm } from "./blog-form"
import { toast } from "sonner"
import { Edit, Trash2, Plus } from "lucide-react"

export function BlogTable() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const result = await getBlogPosts()
    setPosts(result)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este artículo?")) {
      const success = await deleteBlogPost(id)
      if (success) {
        toast.success("Artículo eliminado")
        loadPosts()
      } else {
        toast.error("Error al eliminar")
      }
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingPost(null)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingPost(null)
    loadPosts()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingPost(null)
  }

  if (showForm) {
    return (
      <div className="bg-white/5 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">
          {editingPost ? "Editar Artículo" : "Crear Artículo"}
        </h3>
        <BlogForm
          post={editingPost || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  if (loading) {
    return <p className="text-white">Cargando artículos...</p>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Artículos del Blog</h3>
        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Artículo
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="text-white/80">No hay artículos aún.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{post.title}</h4>
                  <p className="text-white/70 text-sm">{post.excerpt}</p>
                  <p className="text-white/50 text-xs">
                    Por {post.author} • {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(post)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}