import ReactMarkdown from "react-markdown"
import Image from 'next/image'
import PostHeader from "./post-header";
import classes from "./post-content.module.css"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

// const DUMMY_POSTS = {
//     slug: 'getting-started-with-nextjs',
//     title: 'Getting started with NextJS',
//     image: 'getting-started-with-nextjs.png',
//     excerpt: 'NextJs is a the React framework for production - it makes bulding fullstack react apps and sites a breeze and ships with built-in SSR',
//     date: '2022-02-10',
//     content: '# This is the first post'
// }

function PostContent(props) {
    const { post } = props;

    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenders = {
        // img(image) {
        //     console.log(image)
        //     return (
        //         <Image
        //             src={`/images/posts/${post.slug}/${image.src}`}
        //             alt={image.alt}
        //             width={600}
        //             height={300}
        //         />)
        // },
        paragraph(paragraph) {
            const { node } = paragraph;

            if (node.children[0].type === 'image') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.url}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>
        },
        code(code) {
            // console.log(code.className.slice(9, code.className.length))
            const { language, value } = code;
            console.log(code)
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={code.className.slice(9, code.className.length)}
                    children={code.children}
                />
            )
        }
    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenders}>
                {post.content}
            </ReactMarkdown>
        </article>)
}

export default PostContent;