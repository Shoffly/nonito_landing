import Head from 'next/head'
import styles from '../styles/Blog.module.css'

export default function GrowthLab() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Growth Marketing",
      date: "2024-03-20",
      excerpt: "Learn the fundamentals of growth marketing and how to apply them to your business.",
      author: "Jane Doe"
    },
    {
      id: 2,
      title: "Data-Driven Decision Making",
      date: "2024-03-18",
      excerpt: "Discover how to use data analytics to make better marketing decisions.",
      author: "John Smith"
    }
    
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Growth Lab Blog</title>
        <meta name="description" content="Growth marketing insights and strategies" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
        <h1 className={styles.title}>Nonito Growth Lab</h1>
        </div>
        
        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <div className={styles.metadata}>
                <span>{post.date}</span>
                <span>By {post.author}</span>
              </div>
              <p>{post.excerpt}</p>
              <button className={styles.readMore}>Read More</button>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
