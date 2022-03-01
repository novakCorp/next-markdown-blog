import fs from 'fs';
import path from 'path';
import Head from 'next/head'
import matter from 'gray-matter';
import Post from '../components/Post';

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} />
          ))}
      </div>

    </div>
  )
} 

// fetch data at build time 
export async function getStaticProps() {

  const files = fs.readdirSync(path.join('posts'));
  // get slug and frontmatter from posts
  const posts = files.map(filename => {

     // Create slug
    const slug = filename.replace('.md', '');

    // Get frontmatter which basically means the data
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const {data:frontmatter} = matter(markdownWithMeta);

    return {
      slug,
      frontmatter
    }
  })

  console.log(posts);

  return {
    props: {
      posts,
    }
  }
}