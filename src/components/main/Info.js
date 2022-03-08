export default function Info({scrolled, posStart, posEnd}) {
    const base = -480;
    const start = posStart + base;
    const position = scrolled - start;
    console.log(start);
    console.log(position);
    console.log(scrolled);

    return (
        <section id="info" className="myScroll">
            <div style={
                scrolled >= start
                ?
                {transform: `translateX(${position}px)`}
                :
                null} className="box"></div>
            <h1>Mission</h1>
            <strong>“</strong>
            <h5>In the middle of the Pacific Ocean, lies a tropical island,</h5>
            <h5>land of beauty and adventure, home of the Chamorro people, land of kindess and acceptation</h5>
            <span>where cultures flourished into a unique identity.</span>
            <p>Escape the ordinary! Let us give you the keys to our island. together we shall become<br />the path finders to Guam's hidden beauties.</p>
            <p>We wii introduce you to Guam the genuine, a place where tradition, sophistication, <br /> nature and serenity met to create the idyllic stay</p>
        </section>
    )
}