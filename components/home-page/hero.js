import React from 'react'
import Image from "next/image"
import classes from '../home-page/hero.module.css'

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/posts/site/profile.jpeg"
                    alt="An image showing Bhumi"
                    width={300}
                    height={300}
                />
            </div>
            <h1>
                Hi, I'm Bhumi
            </h1>
            <p>
                Blog about web development - especially frontend frameworks like Angular or React
            </p>
        </section>
    )
}

export default Hero