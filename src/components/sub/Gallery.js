import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
    let main = useRef(null);
    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const api_key = "afa267e57b8885c90d6e77c92d86a32f";
    const method1 = 'flickr.interestingness.getList';
    const num = 5;
    const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
    
    useEffect(() => {
        main.current.classList.add('on');
        axios
            .get(url)
            .then(json => {
                setItems(json.data.photos.photo);
            })
    }, []);

    return(
        <>
        <main className="content gallery" ref={main}>
        <figure id="sub_main">
                <h1 className="txtFirst"> It's gallery</h1>
                <h1 className="txtSecond">Lorem, ipsum.</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
            </figure>
            <div className="inner">
                <h1>Gallery</h1>
                <section>
                    {items.map((item,idx)=>{
                        return(
                        <article key={idx}>
                            <div className="inner">
                                <div className="pic" onClick={() => {
                                    setIsPop(true);
                                    setIndex(idx);
                                }}>
                                    <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                                </div>
                                <h2>{item.title}</h2>
                            </div>
                        </article>
                        )
                    })}
                </section>
            </div>
        </main>
        { isPop ? <Popup /> : null }
        </>
    )

    function Popup() {
        // 스크롤 막기
        useEffect(() => {
            document.body.style.overflow = 'hidden';
            return() => document.body.style.overflow = 'auto';
        }, [])
        return (
            <aside className="popup">
                <h1>{items[index].title}</h1>
                <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />
                <span onClick={() => { 
                    setIsPop(false); 
                }}>Close</span>
            </aside>
        )
    }
}