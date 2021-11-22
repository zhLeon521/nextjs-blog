/*
 * @Description: 
 * @Autor: Blueheart
 * @Date: 2021-11-19 20:52:12
 * @LastEditTime: 2021-11-20 17:37:03
 * @FilePath: \nextjs-blog\pages\posts\[id].js
 */
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'

import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }