import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import Nav from '../components/Nav';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

export default function GrowthLab() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [regularPosts, setRegularPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      // Fetch featured post
      const { data: featured } = await supabase
        .from('blogposts')
        .select('id, title, slug, excerpt, author, category, image_url, published_at')
        .eq('placement', 'featured')
        .eq('status', 'published')
        .single();

      // Fetch regular posts
      const { data: regular } = await supabase
        .from('blogposts')
        .select('id, title, slug, excerpt, author, category, image_url, published_at')
        .eq('placement', 'normal')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      setFeaturedPost(featured);
      setRegularPosts(regular || []);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <SEO 
        title="Growth Lab | Nonito"
        description="Growth marketing insights and strategies"
        pagePath="/growthlab"
      />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>The Growth Lab<span className={styles.dot}>.</span></h1>
            <p className={styles.subtitle}>Insights, strategies, and best practices for growth marketing.</p>
            <div className={styles.divider}></div>
          </div>

          {/* Featured Post Section */}
          {featuredPost && (
            <section className={styles.featured}>
              <div className={styles.featuredContent}>
                <span className={styles.category}>{featuredPost.category}</span>
                <Link href={`/growthlab/${featuredPost.slug}`}>
                  <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                </Link>
                <p className={styles.excerpt}>{featuredPost.excerpt}</p>
                <Link href={`/growthlab/${featuredPost.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
              <div className={styles.featuredImage}>
                {featuredPost.image_url && (
                  <Image
                    src={featuredPost.image_url}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    objectFit="cover"
                  />
                )}
              </div>
            </section>
          )}

          {/* Regular Posts Grid */}
          <div className={styles.grid}>
            {regularPosts.map((post) => (
              <article key={post.id} className={styles.card}>
                {post.image_url && (
                  <div className={styles.cardImage}>
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={400}
                      height={250}
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <span className={styles.category}>{post.category}</span>
                  <Link href={`/growthlab/${post.slug}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <Link href={`/growthlab/${post.slug}`} className={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
