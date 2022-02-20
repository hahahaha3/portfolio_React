import axios from 'axios';
import { setYoutube } from '../../redux/actions';
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Intro() {
    const vidData = useSelector(state => state.youtubeReducer.youtube);
    const dispatch = useDispatch();
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);

    const api_key = 'AIzaSyCeRTGZL0cgymOacGQ1PqlWiDZlIFRUpOc';
    const play_List = 'PLx62HH_9oB7gR6dIX1BG5OsxzVFJmfer9';
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_List}&maxResults=${num}`;

    const fetchYoutube = async () => { 
        await axios.get(url).then(json=>{     
            dispatch(setYoutube(json.data.items));     
        });    
    }

    useEffect(() => {
        fetchYoutube();
    }, []);

    return (
        <>
            <section id="intro" className="myScroll">
                <div className="inner">
                    <Swiper
                        effect={"coverflow"}
                        spaceBetween={100} 
                        slidesPerView={2} 
                        loop={true}
                        pagination={true}
                        grabCursor={true}
                        navigation={true}
                        centeredSlides={true}
                        coverflowEffect={{
                            rotate: 40,
                            stretch: 0,
                            depth: 700,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]} 
                        className="mySwiper"
                    >
                        {vidData.map((vid, index) => {
                            let tit = vid.snippet.title;
                            let tit_len = tit.length;

                            if (index < 5) {
                                return(
                                    <SwiperSlide key={index} virtualIndex={index}>
                                        <img src={vid.snippet.thumbnails.high.url} onClick={()=>{
                                        setIsPop(true);
                                        setIndex(index);
                                        }} />
                                        <h2>{tit_len>30 ? tit.substr(0,30)+'...' : tit}</h2>
                                </SwiperSlide>
                                )
                            }
                        })}
                    </Swiper>
                </div>
            </section>
            {isPop ? <Popup /> : null}
        </>
    )

    function Popup() {
        useEffect(() => {
            document.body.style.overflow = 'hidden';
            return() => document.body.style.overflow = 'auto';
        }, []);

        return (
            <aside className="popup">
                <iframe 
                    src={"https://www.youtube.com/embed/"+vidData[index].snippet.resourceId.videoId}  
                    width='100%' 
                    height='100%' 
                    allowFullScreen
                ></iframe>
                <span onClick={()=>setIsPop(false)}>close</span>
            </aside>
            )
        }
    }