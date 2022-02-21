

export default function Visual() {
    const path = process.env.PUBLIC_URL;
    return (
        <figure id="visual_figure">
            <video src={`${path}/img/visual6.mp4`} autoPlay loop muted>
            </video>
            <div className="txtBox">
                <h1>New discovery</h1>
                <p>The Tsubaki Tower, will open a new chapter of discoveries and delight.</p>
            </div>
        </figure>
    )
}