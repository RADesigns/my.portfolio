import Head from 'next/head'
import Image from 'next/image'
import { getHeapCodeStatistics } from 'v8'
import styles from '../styles/Home.module.scss'

const BLOG_URL = 'https://portfolio-blog-ghost-cms.herokuapp.com'
const CONTENT_API_KEY = 'a9b7fc0af2db395b8174abc0f1'

type Post = {
  title: string,
  slug: string
}

async function getPosts() {
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`)
    .then((res) => res.json())

    const posts = res.posts
    return posts
}


export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: { posts }
  }
}

const Home: React.FC <{ posts: Post[] }> = (props) => {
  const { posts } = props
  return (
    <div className={`${styles.container}, ${styles.main}`}>
      <h1>Posts</h1>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post}</li>
        })}
      </ul>
    </div>
  )
}

export default Home