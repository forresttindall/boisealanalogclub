import React from 'react'
import { motion } from 'framer-motion'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Welcome to the Boise Analog Club!",
      date: "August 14, 2025",
      author: "Forrest Tindall",
      excerpt: "Building a welcoming community for film photography enthusiasts in Boise and beyond...",
      content: "Welcome to the Boise Analog Club! I created this group to build a genuine community around our shared love of analog photography. In a world that's increasingly digital, there's something special about the deliberate, thoughtful process of shooting film. But more than that, I wanted to create a space where photographers of all backgrounds could come together, learn from each other, and celebrate this beautiful art form. Whether you're picking up your first film camera or you've been shooting analog for decades, this group is for you. We believe that photography is about more than just technical skills it's about connection, creativity, and community. My goal is to make this the most welcoming and inclusive photography group in Boise. Everyone has a unique perspective to share, and every voice matters here. We're not just about taking pictures; we're about building lasting friendships, supporting each other's creative journeys. I'm excited to see what we'll create together as a community."
    }
  ]

  return (
    <div className="page blog-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Club Blog</h1>
        <p className="page-subtitle">Stories, updates, and insights from the Boise analog photography community</p>
      </motion.div>

      <motion.div 
        className="blog-posts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="blog-post"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="blog-post-header">
              <h2>{post.title}</h2>
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-author">by {post.author}</span>
              </div>
            </div>
            
            <div className="blog-content">
              <p className="blog-excerpt">{post.excerpt}</p>
              <p>{post.content}</p>
            </div>
            
          </motion.article>
        ))}
      </motion.div>

      <motion.div 
        className="blog-sidebar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="sidebar-widget">
          <h3>Recent Posts</h3>
          <ul>
            {blogPosts.slice(0, 3).map(post => (
              <li key={post.id}>
                <a href={`#post-${post.id}`}>{post.title}</a>
                <span className="sidebar-date">{post.date}</span>
              </li>
            ))}
          </ul>
        </div>

      </motion.div>
    </div>
  )
}

export default Blog