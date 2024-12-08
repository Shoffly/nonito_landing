const SITE_URL = 'https://nonito.link';

function generateRobotsTxt() {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Allow: /pricing
Allow: /terms-conditions
Allow: /form
Allow: /growthlab
Allow: /zyda-analysis

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow
Disallow: /api/
Disallow: /_next/
Disallow: /static/
`;
}

export async function getServerSideProps({ res }) {
  try {
    const robotsTxt = generateRobotsTxt();

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
    res.write(robotsTxt);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return {
      props: {},
    };
  }
}

export default function Robots() {
  return null;
}
