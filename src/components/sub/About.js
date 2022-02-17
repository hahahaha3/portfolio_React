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
                <section className="about_sub">
                    <h2>About us.</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, modi! Maxime similique maiores, vel sunt illum, odio ipsa quos rerum aut id architecto dignissimos. Ipsam repellat.</p>
                    <div className="aboutPic">
                        <img src={`${path}/img/aboutPic.jpg`} />
                        <div className="aboutPicTxt">
                            <span>Inspired by the local kindness and the</span>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur deleniti, veritatis perferendis labore accusamus animi.</h4>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores numquam totam dignissimos delectus, quae officia laudantium ipsam atque consequatur quibusdam optio commodi iure earum qui cum. Repellendus, eius blanditiis maxime, porro nisi voluptates libero praesentium quas, consequatur unde accusantium totam.<br /><br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, provident repudiandae. Et veritatis architecto obcaecati magnam explicabo, provident recusandae laboriosam veniam illo tempore nostrum qui non voluptas amet labore iure quisquam quod natus impedit doloribus voluptatibus. Non saepe repudiandae quae! Repellendus, provident. Assumenda eos similique voluptatem quidem cum aut beatae?</p>
                            <strong>Enjoy the Journey</strong>
                        </div>
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