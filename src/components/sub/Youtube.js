import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Youtube() {
    let main = useRef(null);
    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const api_key = 'AIzaSyCeRTGZL0cgymOacGQ1PqlWiDZlIFRUpOc';
    const play_List = 'PLx62HH_9oB7gR6dIX1BG5OsxzVFJmfer9';
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_List}&maxResults=${num}`;
    const path = process.env.PUBLIC_URL;
    
    
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
                    <section className="top_Youtube">
                        <div className="left_Youtube">
                            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo veritatis vel libero explicabo doloribus nostrum ex? Excepturi, libero, aut incidunt vitae voluptate sapiente recusandae iste amet et nam nulla blanditiis mollitia pariatur numquam eligendi animi debitis obcaecati aliquid inventore quam dolorum. Nesciunt facere nihil repellendus earum odio expedita, deserunt aperiam.</p>
                            <img src={`${path}/img/sunset.jpg`} />
                        </div>
                        <div className="right_Youtube">
                            <iframe width="600" height="315" src="https://www.youtube.com/embed/jEnd8JIMii4" title="YouTube video player" frameBorder="0"  allowFullScreen></iframe>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit molestiae repellendus natus impedit voluptatum, mollitia earum nulla laboriosam cupiditate sit reiciendis beatae placeat ab illo maiores quaerat nemo sed quam similique qui, inventore dolores officiis voluptatem! Dolorum magnam sint delectus eaque est culpa? Est iste error quos ea suscipit accusamus voluptatum, tempore autem quidem possimus fuga id molestiae mollitia deserunt impedit cumque illum iusto numquam. Unde ad harum perferendis porro perspiciatis at est quam distinctio placeat itaque odit nihil, alias repudiandae? Fuga commodi minima doloribus quis nesciunt! Facere iusto quae recusandae asperiores a inventore est dolor atque veniam vero?<br /> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ipsa dolorum sunt minima numquam est sit, harum magnam nulla excepturi, totam voluptates quasi delectus aperiam odit alias soluta similique mollitia cupiditate iusto odio consequuntur quos architecto. Eveniet inventore accusamus fugiat fuga error, unde quae voluptate aspernatur sapiente libero, amet minima.<br /> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ipsa dolorum sunt minima numquam est sit, harum magnam nulla excepturi, totam voluptates quasi delectus aperiam odit alias soluta similique mollitia cupiditate iusto odio consequuntur quos architecto. Eveniet inventore accusamus fugiat fuga error, unde quae voluptate aspernatur sapiente libero, amet minima.</p>
                        </div>
                    </section>
                    <section className="main">
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