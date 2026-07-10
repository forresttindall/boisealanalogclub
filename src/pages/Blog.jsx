import { useEffect } from 'react'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: 'Welcome to Boise Analog Club',
    date: 'August 14, 2025',
    author: 'Forrest Tindall',
    excerpt:
      'A note on why the club exists, what kind of community it wants to become, and why film still feels socially important.',
    content:
      'Boise Analog Club started from a simple idea: film photography deserves a local culture around it, not just isolated accounts online. The club is meant to be generous, curious, and open to photographers at every skill level. The point is not perfection. The point is conversation, process, and building a real community around making images.',
  },
]

const Blog = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="page blog-page">
      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">11</p>
          <div>
            <p className="mono-label">Journal</p>
            <h1 className="section-title">Notes from the club.</h1>
          </div>
        </div>

        <div className="blog-list">
          {blogPosts.map((post) => (
            <article className="blog-entry" key={post.id}>
              <div className="blog-entry-meta">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h2>{post.title}</h2>
              <p className="lead-copy">{post.excerpt}</p>
              <p>{post.content}</p>
            </article>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Blog
