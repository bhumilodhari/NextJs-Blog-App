import React, { Fragment } from 'react'
import FeaturedPost from '../components/home-page/featured-posts'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../helpers/posts-util'
import Head from 'next/head';


const Home = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Bhum's Blog</title>
                <meta name='description' content='I post about programming and web development' />
            </Head>
            <Hero />
            <FeaturedPost posts={props.posts} />
        </Fragment>
    )
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        },
    }
}

export default Home 