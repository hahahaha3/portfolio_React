import { useEffect, useRef, useState } from "react";

export default function Community() {
    const main = useRef(null);
    const input = useRef(null);
    const textarea = useRef(null);
    const showBox = useRef(null);
    const updateInput = useRef(null);
    const updateTextarea = useRef(null);

    const getLocalItems = () => {
        let data = localStorage.getItem('posts');
        if(data) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    }
    const [posts, setPosts] = useState(getLocalItems);
    const createPost = () => {
        const inputVal = input.current.value.trim();
        const textareaVal = textarea.current.value.trim();

        if ( !inputVal || inputVal === '' || !textareaVal || textareaVal==='' ) {
            alert('제목과 본문을 모두 입력하세요');
            return;
        }
        setPosts([
            {
                email: input.current.value,
                title: input.current.value,
                content: textarea.current.value
            }, ...posts
        ])
        input.current.value = '';
        textarea.current.value = '';
    }

    const deletePost = index => {
        setPosts(posts.filter((_, idx) => idx !== index))
    }

    const enableUpdate = index => {
        setPosts(posts.map((post, idx) => {
            if(idx === idx) post.enableUpdate =true;
            return post;
        }))
        console.log(posts);
    }

    const disableUpdate = index => {
        setPosts(
            posts.map((post, idx) => {
                if(idx === index) post.enableUpdate =false;
                return post
            })
        )
        console.log(posts);
    }

    const updatePost = index => {
        const inputVal2 = updateInput.current.value.trim();
        const textareaVal2 = updateTextarea.current.value.trim();
        if (!inputVal2 || inputVal2 === '' || !textareaVal2 || textareaVal2 === '') {
            alert('수정할 제목과 본문을 입력하세요');
            return;
        }
        
        setPosts(
            posts.map((post, idx) => {
                if(idx === index) {
                    post.title = updateInput.current.value;
                    post.content = updateTextarea.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })
        )
    }

    useEffect(() => {
        main.current.classList.add('on');
    }, []);

    useEffect(() => {
        console.log('변경됨');
        localStorage.setItem('post', JSON.stringify(posts));
    }, [posts]);

    return(
        <main className="content community" ref={main}>
            <figure id="sub_main">
                <h1 className="txtFirst"> It's community</h1>
                <h1 className="txtSecond">Lorem, ipsum.</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
            </figure>
            <div className="inner">
                <section>
                    <div className="input">
                        <div className="inputBox">
                            <div className="inputTxt">
                                <h1>Write us</h1>
                                <input 
                                    type="email" 
                                    name="" 
                                    id="" 
                                    ref={input}
                                    placeholder="이메일을 입력하세요"
                                />
                                <input 
                                    type="text" 
                                    name="" 
                                    id="" 
                                    ref={input}
                                    placeholder="제목을 입력하세요"
                                /><br />
                            </div>
                            <textarea 
                            placeholder="본문을 입력하세요" 
                            cols="30" 
                            rows="10"
                            ref={textarea}
                            ></textarea> <br />
                        </div>
                        <button onClick={() => {
                            input.current.value = '';
                            textarea.current.value = '';
                        }}>Cancel</button>
                        <button onClick={ createPost }>Create</button>
                    </div>

                    <div className="showList" ref={showBox}>
                        {posts.map((post, idx) => {
                            return (
                                <article key={idx}>
                                    {
                                        post.enableUpdate
                                        ?
                                        <>
                                            <div className="post">
                                                <input 
                                                    type="text" 
                                                    defaultValue={post.title} 
                                                    ref = {updateInput}
                                                    /> <br/>
                                                <textarea 
                                                    defaultValue={post.content}
                                                    ref={updateTextarea}
                                                ></textarea> <br/>
                                            </div>
                                            <div className="btns">
                                                <button onClick={() => updatePost(idx)}>Update</button>
                                                <button onClick={() => disableUpdate(idx)}>Cancel</button>
                                            </div>
                                        </>
                                        :
                                    <>
                                        <div className="post">
                                            <h2>{post.title}</h2>
                                            <p>{post.content}</p>
                                        </div>
                                        <div className="btns">
                                            <button onClick={() => enableUpdate(idx)}>Modify</button>
                                            <button onClick={() => deletePost(idx)}>Delete</button>
                                        </div>
                                    </>
                                    }
                                </article>
                            )
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}