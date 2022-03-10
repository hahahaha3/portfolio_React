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
                            <h1>Luxurious accommodations in the most-sought after destinations</h1>
                            <p>Our hotels have been called upon for starring roles in historic events. The UN Charter was drafted and signed by 50 countries in the Garden Room of Fairmont San Francisco. William Lyon Mackenzie King hosted Winston Churchill and Franklin D. Roosevelt at Fairmont Le Château in 1943 as the two men drew up plans for the Normandy invasion of Europe.  Lennon and Yoko Ono made history with their Bed-in for Peace at Fairmont The Queen Elizabeth in Montreal in 1969, when the former Beatle penned the lyrics and recorded “Give Peace a Chance”, which became the anthem of the anti-war movement.</p>
                            <img src={`${path}/img/sunset.jpg`} />
                        </div>
                        <div className="right_Youtube">
                            <iframe width="600" height="315" src="https://www.youtube.com/embed/jEnd8JIMii4" title="YouTube video player" frameBorder="0"  allowFullScreen></iframe>
                            <p>Claude Monet painted evocative scenes of London during several visits to The Savoy. In fact, scientists have pin-pointed which balconies he painted from based on the lighting conditions in his canvases (rooms 610 and 611 in 1900 and rooms 510 and 511 in 1901).  Noël Coward recovered from the flu and finished his comedy Private Lives in the penthouse of Fairmont Peace Hotel in Shanghai. And the roster of Hollywood’s A-list of celebs and stars is endless.<br /> <br /> The distinctive collection of unrivaled hotels under the Fairmont banner reflects our belief in providing world-class service to guests who appreciate unique locations. Today, when you think of a landmark hotel around the world, chances are it’s a Fairmont Hotel. From The Savoy in the heart of London to Fairmont Peace Hotel in Shanghai or Makkah Clock Royal Tower, A Fairmont Hotel, our portfolio of properties features the most celebrated addresses. At the heart of capital cities or ocean-front in the Maldives, we continue to strive to be worthy of our legacy of providing unforgettable experiences to our treasured guests.<br /> <br /> Fairmont Hotels offer more than luxurious rooms, world-class dining and amazing locations. They help guests create lasting memories. Perhaps this is why so many celebrities, royalty, politicians and artists have made their favorite Fairmont hotel their home away from home. As we embrace our second century of hospitality, we celebrate the defining moments that are our history. Distilling more than a century of notable guests and headline events, this timeline offers a small glimpse into what makes Fairmont Hotels & Resorts an unrivaled luxury brand.</p>
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