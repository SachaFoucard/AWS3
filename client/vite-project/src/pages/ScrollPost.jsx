import React, { useEffect, useState } from 'react'
import Post from '../components/Post';

function ScrollPost() {

    const [posts, setPosts] = useState([]);

    const LoadPost = async () => {
        try {
            const data = await fetch('http://localhost:7000/api/posts')
            const response = await data.json();
            setPosts(response)
        } catch (error) {
            console.log('1');
            console.log(error);
        }
    }

    useEffect(() => {
        LoadPost()
    }, [posts.length])

    return (
        <>
            {posts.map((item,index) => <Post key={index} username={item.user} imageUrl={item.keyName} description={item.description} />)}
        </>
    )
}

export default ScrollPost