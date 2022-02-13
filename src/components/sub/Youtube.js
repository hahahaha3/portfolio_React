import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Youtube() {
    let main = useRef(null);
    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const api_key = 'AIzaSyCeRTGZL0cgymOacGQ1PqlWiDZlIFRUpOc';
    const play_List = 'PLGOVj4gmzJyBMQSKPpBoycEvgXVFPMRZV';
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_List}&maxResults=${num}`;
    
    useEffect(() => {
        main.current.classList.add('on');

        axios
            .get(url)
            .then(json => {
                setItems(json.data.items);
            })
    }, []);

    return(
        <>
            <main className="content youtube" ref = {main}>
                <figure id="sub_main">
                    <h1 className="txtFirst"> It's youtube</h1>
                    <h1 className="txtSecond"> the people</h1>
                    <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                </figure>
                <div className="inner">
                    <section>
                        {items.map((item, idx) => {
                            let tit = item.snippet.title;
                            let tit_len = tit.length;
                            let desc = item.snippet.description;
                            let desc_len = desc.length;
                            return (
                                <article key={idx}>
                                    <div className="pic" onClick={() => {
                                        setIsPop(true);
                                        setIndex(idx);
                                    }}>
                                        <img src={item.snippet.thumbnails.medium.url} />
                                    </div>
                                    <div className="txt">
                                        <h2>{tit_len > 100 ? tit.substr(0, 100) + '...' : tit}</h2>
                                        <p>{desc_len > 400 ? desc.substr(0, 400) + '...' : desc}</p>
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
        useEffect(() => {
            document.body.style.overflow='hidden';
            return() => document.body.style.overflow='auto';
        })
        return(
            <aside className="popup">
                                <iframe src={"https://www.youtube.com/embed/"+items[index].snippet.resourceId.videoId} frameBorder="0" width="100%" height="100%" allowFullScreen></iframe>
                <span onClick={() => {
                    setIsPop(false);
                }}>Close</span>
            </aside>
        )
    }
}