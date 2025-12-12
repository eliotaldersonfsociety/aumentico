"use server"

import { db } from "@/lib/db"
import { blogPosts } from "@/drizzle/schema"
import { eq, desc } from "drizzle-orm"

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  imageUrl?: string
  author: string
  createdAt: Date
  updatedAt: Date
}

export async function getBlogPosts(limit?: number, offset?: number): Promise<BlogPost[]> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit || 10)
      .offset(offset || 0)

    return posts.map(post => ({
      ...post,
      excerpt: post.excerpt || undefined,
      imageUrl: post.imageUrl || undefined,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1)

    if (posts.length === 0) return null

    const post = posts[0]
    return {
      ...post,
      excerpt: post.excerpt || undefined,
      imageUrl: post.imageUrl || undefined,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function createBlogPost(data: {
  title: string
  content: string
  excerpt?: string
  imageUrl?: string
  author: string
}): Promise<BlogPost | null> {
  try {
    const newPost = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.insert(blogPosts).values(newPost)

    return newPost
  } catch (error) {
    console.error("Error creating blog post:", error)
    return null
  }
}

export async function updateBlogPost(id: string, data: {
  title?: string
  content?: string
  excerpt?: string
  imageUrl?: string
}): Promise<boolean> {
  try {
    await db
      .update(blogPosts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))

    return true
  } catch (error) {
    console.error("Error updating blog post:", error)
    return false
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id))
    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return false
  }
}