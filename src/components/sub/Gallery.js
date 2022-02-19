import axios from "axios";
import Masonry from 'react-masonry-component';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFlickr } from "../../redux/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Gallery() {
    const main = useRef(null);
    const frame = useRef(null);
    const input =useRef(null);
    const picData = useSelector(state=>state.flickrReducer.flickr);
    const dispatch = useDispatch();
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0); 
    const [loading, setLoading] = useState(true);
    const [enableClick, setEnableClick] = useState(true); 
    const [isInterest, setIsInterest] = useState(true);
    const path = process.env.PUBLIC_URL;
    
    const masonryOptions = {
        fitWidth: false,
        gutter: 0,
        itemSelector: '.item',
        transitionDuration: '0.5s'
    }
    
    const getFlickr = async opt => {
        const api_key = "afa267e57b8885c90d6e77c92d86a32f";
        const method1 = 'flickr.interestingness.getList';
        const method2 = 'flickr.photos.search';
        const num = opt.count;
        let url = '';

        if(opt.type === 'interest'){
            url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
        }
        if(opt.type === 'search'){
            url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }  

        await axios.get(url).then(json=>{   
            if(json.data.photos.photo.length === 0) {
                alert('해당 검색어의 이미지가 없습니다.');
                return;
            }
            dispatch(setFlickr(json.data.photos.photo));
        })
        setTimeout(() => {
        frame.current.classList.add('on');
        setLoading(false);
        setTimeout(() => {
        setEnableClick(true);
        }, 1000);   
        }, 1000); 
    }

    const showInterest = () => { 
        input.current.value='';
        if(enableClick && !isInterest) {
            setIsInterest(true);
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');
            getFlickr({
                type: 'interest',
                count: 30
            });
        }
    }

    const showSearchEnter = (e) => {
        if(e.key !== 'Enter') return;
        let result = input.current.value;
        result = result.trim();
        if(result === '') {
            alert('검색어를 입력하세요.');
            return;
        }
        if(enableClick){
            setIsInterest(false);
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');
            getFlickr({
                type: 'search',
                count: 30,
                tags: result
            });
        }
    }

    const showSearch = () => {
        let result = input.current.value;
        result = result.trim();
        if(result === '') {
            alert('검색어를 입력하세요.');
            return;
        }
        if(enableClick){
            setIsInterest(false);
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');
            getFlickr({
                type: 'search',
                count: 30,
                tags: result
            });
        }
    }

    useEffect(() => {
        main.current.classList.add('on');
        getFlickr({
            type: 'interest',
            count: 30
        });
    }, []);

    return(
        <>
        <main className="content gallery" ref={main}>
        <figure id="sub_main">
                <h1 className="txtFirst"> It's Gallery</h1>
                <h1 className="txtSecond"> the people</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
        </figure>
        <div className="innerWrap">
            <div className="inner">
                <div className="gallery_About">
                    <h1>Lorem, ipsum.</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus deserunt quod quas dolore ab reprehenderit iure corrupti! Itaque atque sed repellendus nisi porro quia laborum maiores ad recusandae deserunt enim nesciunt tempora unde mollitia, velit doloribus molestiae explicabo voluptatum quae. Qui iusto accusamus ipsum esse facere id vero enim? Dolorem voluptates quibusdam architecto vero aspernatur odio quam placeat quod molestias sed aperiam reprehenderit alias quae iure itaque qui non nobis modi quis, autem ipsa fuga ad cum ut. Sit quia eius quis quibusdam voluptates, dolorum adipisci! Magnam, quidem voluptates distinctio sequi at error, ipsam a qui consequuntur quos pariatur architecto!</p>
                    <div className="aboutTxt">
                        <img src={`${path}/img/aboutSub.jpeg`} />
                        <h3><span>“</span> Our work does make<br /> &nbsp; sense only if it is a faithful <br /> &nbsp; &nbsp;withness of his time.<br /><span className="omgSpan">”</span></h3>
                    </div>
                </div> 
                <div className="searchBox">
                    <input type="text" ref={input} onKeyUp={showSearchEnter} placeholder="검색어를 입력하세요" />
                    <button onClick={ showSearch }>SEARCH</button>
                    {/* <FontAwesomeIcon icon={faRepeat} className="icons" onClick= {showInterest} /> */}
                    <span onClick= {showInterest}>INTEREST</span>
                </div>
                {loading ? <img className='loading' src={path+'/img/loading.gif'} /> : null}
                <section ref={frame}>
                    <Masonry
                        elementType={'div'}
                        options={masonryOptions}
                    >
                    {picData.map((item,idx)=>{
                        return(
                            <article key={idx} className="item">
                                <div className="inner">
                                    <div className="pic" data={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} onClick={()=>{
                                        setIsPop(true);
                                        setIndex(idx);
                            }}>
                                    <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                                </div>
                                {/* <h2>{item.title}</h2> */}
                            </div>
                        </article>
                        )
                    })}
                    </Masonry>
                </section>
            </div>
        </div>
    </main>
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
