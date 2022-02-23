import { faMap, faMapLocationDot, faMapMarked, faMapMarker, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react"

export default function Map() {
    let main = useRef(null);
    const {kakao} = window;
    const container = useRef(null);
    const [map, setMap] = useState(null);
    const path = process.env.PUBLIC_URL;
    const info = [
        {
            title: '본점',
            latlng: new kakao.maps.LatLng(37.42769562397125, 126.51664717711739),
            imgSrc : path+'/img/map.png',        
            imgSize : new kakao.maps.Size(30,30), 
            imgPos : {offset: new kakao.maps.Point(116, 90)},
        },
    ];
    const [mapInfo, setMapInfo] = useState(info);

    useEffect(() => {
        const options = {
            center: new kakao.maps.LatLng(37.42769562397125, 126.51664717711739),
            level: 9
        }
        const map = new kakao.maps.Map(container.current, options);
        setMap(map);

        map.setZoomable(false);    

        new kakao.maps.Marker({
            map: map,
            position: mapInfo[0].latlng,
            title: mapInfo[0].title,
            image: new kakao.maps.MarkerImage(mapInfo[0].imgSrc, mapInfo[0].imgSize, mapInfo[0].imgPos)
        })
    }, []);



    return (
        <main id="location" className="myScroll" ref={main}>
            <div className="inner">
                <article className="mapTxt">
                    <h1>We are here</h1>
                    <p>Ideally suituated between Tumon beach and Gun Beach, the Tower lies on the highest hill of Tumon bay. facing the pacific Ocean</p>
                    <div className="txtbox">
                        <h4>Distance to the Center of Tumon</h4>
                        <p> - By foot: 10 minutes</p>
                        <p> - By car: 3 minutes</p>
                    </div>
                    <div className="txtbox">
                        <h4>Distance from the airport</h4>
                        <p> - By car: 15 minutes</p>
                    </div>
                    <div className="address">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mapIcon"/>
                        <h3>5/F, The Peninsula Korea Salisbury</h3>
                        <span>Road, Kowloon</span>
                    </div>

                </article>
                <article id="map" ref={container}></article>
            </div>
        </main>
    )
}
