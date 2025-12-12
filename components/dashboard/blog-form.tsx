"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { createBlogPost, updateBlogPost, BlogPost } from "@/app/actions/blog"
import { uploadImage } from "@/app/actions/upload-image"
import { toast } from "sonner"

interface BlogFormProps {
  post?: BlogPost
  onSuccess: () => void
  onCancel: () => void
}

export function BlogForm({ post, onSuccess, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    imageUrl: post?.imageUrl || "",
    author: post?.author || "Admin",
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (post) {
        // Update
        const success = await updateBlogPost(post.id, formData)
        if (success) {
          toast.success("Artículo actualizado exitosamente")
          onSuccess()
        } else {
          toast.error("Error al actualizar el artículo")
        }
      } else {
        // Create
        const newPost = await createBlogPost(formData)
        if (newPost) {
          toast.success("Artículo creado exitosamente")
          onSuccess()
        } else {
          toast.error("Error al crear el artículo")
        }
      }
    } catch (error) {
      toast.error("Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const result = await uploadImage(formDataUpload)
      if (result.success && result.url) {
        setFormData({ ...formData, imageUrl: result.url })
        toast.success("Imagen subida exitosamente")
      } else {
        toast.error("Error al subir la imagen")
      }
    } catch (error) {
      toast.error("Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-1">Título</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Extracto</label>
        <Textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Contenido</label>
        <Textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Imagen</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="bg-white/10 border-white/20 text-white file:bg-blue-600 file:text-white file:border-none file:rounded file:px-2 file:py-1"
        />
        {uploading && <Skeleton className="w-32 h-4 mt-1 bg-gray-400" />}
        {formData.imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-white">Imagen actual:</p>
            <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded mt-1" />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Autor</label>
        <Input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? "Guardando..." : post ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  )
}