import { Link } from "react-router-dom";

export default function Visual() {
    const path = process.env.PUBLIC_URL;
    return (
        <figure id="visual_figure">
            <video src={`${path}/img/visual6.mp4`} autoPlay loop muted>
            </video>
            <div className="txtBox">
            <Link to='/about'>
                <article className="articleBox">
                    <div className="line">
                        <h1>New discovery</h1>
                        <span>The Tsubaki Tower, will open a new chapter of discoveries and delight.</span>
                    </div>
                </article>
            </Link>
            </div>
        </figure>
    )
}