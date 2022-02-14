import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function About() {
    let main = useRef(null);
    const [members, setMembers] = useState([]);
    const path = process.env.PUBLIC_URL;
    const url = `${path}/db/about.json`;

    useEffect(() => {
        main.current.classList.add('on');

        axios
            .get(url)
            .then(json => {
                setMembers(json.data.data);
            });
    }, []);

    return(
        <main className="content about" ref = {main}>
            <figure id="sub_main">
                <h1 className="txtFirst"> It's all about</h1>
                <h1 className="txtSecond"> the people</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
            </figure>
            <div className="inner">
                <section className="about">
                    <h1>About us.</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus deserunt quod quas dolore ab reprehenderit iure corrupti! Itaque atque sed repellendus nisi porro quia laborum maiores ad recusandae deserunt enim nesciunt tempora unde mollitia, velit doloribus molestiae explicabo voluptatum quae. Qui iusto accusamus ipsum esse facere id vero enim? Dolorem voluptates quibusdam architecto vero aspernatur odio quam placeat quod molestias sed aperiam reprehenderit alias quae iure itaque qui non nobis modi quis, autem ipsa fuga ad cum ut. Sit quia eius quis quibusdam voluptates, dolorum adipisci! Magnam, quidem voluptates distinctio sequi at error, ipsam a qui consequuntur quos pariatur architecto!</p>
                    <div className="aboutTxt">
                        <img src={`${path}/img/aboutSub.jpeg`} />
                        <h3><span>“</span> Our work does make<br /> &nbsp; sense only if it is a faithful <br /> &nbsp; &nbsp;withness of his time.<br /><span className="omgSpan">”</span></h3>
                    </div>
                </section>
                <section className="ceo">
                        <div className="ceoTxt">
                            <h1>The team</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat repudiandae magnam accusamus, dicta quidem voluptatum aut ipsa consequatur eos quisquam, necessitatibus laboriosam reprehenderit provident nulla reiciendis voluptates incidunt vero! In, assumenda. Ratione mollitia necessitatibus natus. Molestias maxime reiciendis velit hic!</p>
                            <div className="ceoTxtNum">
                                <h2 className="counter">455</h2>
                                <p>HAPPY CLIENTS</p>
                            </div>
                            <div className="ceoTxtNum">
                                <h2 className="counter">455</h2>
                                <p>HAPPY CLIENTS</p>
                            </div>
                            <div className="ceoTxtNum">
                                <h2 className="counter">455</h2>
                                <p>HAPPY CLIENTS</p>
                            </div>
                        </div>
                        <div className="ceoImg">
                            <img src={`${path}/img/ceo.jpeg`} />
                        </div>
                </section>
                <section className="member">
                    {members.map( (data, idx) => {
                        return(
                            <article key={idx}>
                                <img src={`${path}/img/${data.pic}`} />
                                <h2>{data.name}</h2>
                                <p>{data.position}</p>
                            </article>
                        )
                    } )}
                </section>
            </div>
        </main>
    )
}