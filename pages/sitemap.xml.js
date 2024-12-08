import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://nonito.link';

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

// Add all your static pages here
const STATIC_PAGES = [
  '',              // home page
  '/pricing',
  '/terms-conditions',
  '/form',
  '/growthlab',  
  '/zyda-analysis'
];

function generateSiteMap(staticPages, blogPosts = []) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((path) => {
          return `
            <url>
              <loc>${`${SITE_URL}${path}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>${path === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
      ${blogPosts
        .map(({ slug, created_at, title }) => {
          return `
            <url>
              <loc>${`${SITE_URL}/growthlab/${slug}`}</loc>
              <lastmod>${new Date(created_at).toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  // Remove empty lines and extra whitespace
  return sitemap.trim().replace(/^\s+/gm, '');
}

export async function getServerSideProps({ res }) {
  try {
    // Add some temporary blog posts for testing
    const tempBlogPosts = [
      {
        slug: 'getting-started-with-growth-marketing',
        created_at: '2024-03-20',
        title: 'Getting Started with Growth Marketing'
      },
      {
        slug: 'data-driven-decision-making',
        created_at: '2024-03-18',
        title: 'Data-Driven Decision Making'
      }
    ];

    // Fetch all blog posts from Supabase
    let { data: blogPosts, error } = await supabase
      .from('blogposts')
      .select(`
        slug,
        created_at,
        title
      `)
      .not('slug', 'is', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      blogPosts = tempBlogPosts;
    }

    // Use the fetched posts or fall back to temporary posts if none found
    const postsToUse = (blogPosts && blogPosts.length > 0) ? blogPosts : tempBlogPosts;

    // Generate the XML sitemap
    const sitemap = generateSiteMap(STATIC_PAGES, postsToUse);

    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
    
    // Write the XML to the response
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Even if there's an error, generate a sitemap with just static pages
    const sitemap = generateSiteMap(STATIC_PAGES, []);
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  }
}

// Default export to prevent next.js errors
export default function Sitemap() {
  return null;
}
