import { useEffect, useState } from "react"

export default function News({scrolled, posStart, posEnd}){
    const defaultData = [
        {email: 'abc@gmail.com', title: 'Hello', content: 'Here comes description in detail.'},
        {email: 'hahaha@naver.com', title: 'Hahaha', content: 'OMG!!'},
        {email: 'apple@kakao.com', title: 'APPLE', content: 'Good morning'},
        {email: 'nice@gmail.com', title: 'HelloHello!', content: 'Here comes description in detail.'},
        {email: 'gugu@gmail.com', title: 'Orange', content: 'Good.'},
        {email: 'yeah@gmail.com', title: 'Hihihi', content: 'Hihihihi'}
    ]
    const getLocalItems = () => {
        let data = localStorage.getItem('posts');
        if(data) {
            return JSON.parse(data);
        } else {
            return defaultData;
        }
    }
    const [posts] = useState(getLocalItems);
    const base = 0;
    const start = posStart + base;
    const end = posEnd + base;
    const position = scrolled - start;
    let style = {};

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, []);

    return (
        <section id="news" className="myScroll">
            <div className="inner">
                <h1>Resent Post</h1>
                <ul>
                    {posts.map((post, idx) => {
                        if(idx % 2 === 0) {
                            style={transform: `translateX(${position*(idx/2+1)}px)`}
                        }
                        else {
                            style={transform: `translateX(${-position*(idx/2+1)}px)`}
                        }
                        if(idx < 4) {
                            return (
                                <li key={idx} style={scrolled<=start ? style : null}> 
                                    <h2>{post.title}</h2>
                                    <p>{post.content}</p>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </section>
    )
}