import { createClient } from '@supabase/supabase-js';
import parse from 'html-react-parser';
import Head from 'next/head';
import Nav from "../../components/Nav";
import styles from '../../styles/BlogPost.module.css';

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

export async function getStaticPaths() {
  // Get all blog posts
  const { data: posts, error } = await supabase
    .from('blogposts')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching posts:', error);
    return { paths: [], fallback: 'blocking' };
  }

  // Generate paths for each post
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // Show loading state for new paths
  };
}

export async function getStaticProps({ params }) {
  // Fetch the specific blog post
  const { data: post, error } = await supabase
    .from('blogposts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    return {
      notFound: true, // This will show the 404 page
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Revalidate every minute
  };
}

export default function BlogPost({ post }) {
  if (!post) return null;

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta name="keywords" content={post.meta_keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image_url} />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
      </Head>

      <Nav />
      
      <article className={styles.blogPost}>
        {post.image_url && (
          <div className={styles.heroImage}>
            <img src={post.image_url} alt={post.title} />
          </div>
        )}

        <div className={styles.content}>
          <header className={styles.header}>
            <h1>{post.title}</h1>
            
            <div className={styles.metadata}>
              <span className={styles.author}>By {post.author}</span>
              <span className={styles.date}>
                {formatDate(post.published_at || post.created_at)}
              </span>
              {post.category && (
                <span className={styles.category}>{post.category}</span>
              )}
              <span className={styles.readingTime}>{post.reading_time} min read</span>
            </div>
          </header>

          <div className={styles.excerpt}>
            {post.excerpt}
          </div>

          <div className={styles.articleContent}>
            {parse(post.content)}
          </div>
        </div>
      </article>
    </>
  );
}
