import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFlickr } from "../../redux/actions";

export default function Pics() {
    const picData = useSelector(state => state.flickrReducer.flickr);
    const dispatch = useDispatch();
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);

    const getFlickr = async() => {
        const api_key = "afa267e57b8885c90d6e77c92d86a32f";
        const method1 = 'flickr.interestingness.getList';
        const num = 100;
        const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

        await axios.get(url).then(json=>{
            dispatch(setFlickr(json.data.photos.photo));
            })
        }

    useEffect(()=>{
        if(picData.length === 0) getFlickr();
    },[])

    return (
        <>
        <section id="pics" className="myScroll">
            <div className="inner">
                <h1>Gallery</h1>
                <ul>

                    {picData.map((pic,idx)=>{
                        if(idx < 6) {
                            return(
                                <li key={idx} onClick={() => { setIsPop(true); setIndex(idx); }}>
                                    <h5>{pic.title}</h5>
                                    <img className="buddy" src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`} />
                                    <h6>{pic.owner}</h6>
                                    <img className="pic" src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} />
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </section>
        { isPop ? <Popup /> : null }
        </>
    )

    function Popup() {
        useEffect(() => {
            document.body.style.overflow = 'hidden';
            return() => document.body.style.overflow = 'auto';
        }, [])
        return (
            <aside className="popup">
                <h1>{picData[index].title}</h1>
                <img src={`https://live.staticflickr.com/${picData[index].server}/${picData[index].id}_${picData[index].secret}_b.jpg`} />
                <span onClick={() => { 
                    setIsPop(false); 
                }}>CLOSE</span>
            </aside>
        )
    }
}