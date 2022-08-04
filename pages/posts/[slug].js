import Head from 'next/head';
import React from 'react'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../helpers/posts-util';

const PostDetailPage = (props) => {

    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="viewport" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    )
}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}

export function getStaticPaths() {
    const postsFilesName = getPostsFiles();

    const slugs = postsFilesName.map(fileName => fileName.replace(/\.md$/, ''))

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false
    }
}

export default PostDetailPage