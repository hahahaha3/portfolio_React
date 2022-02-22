import { useEffect, useState } from "react"

export default function Opening() {
    const setDate = new Date('2022-12-25T00:00:00+0900');
    const now = new Date();
    const dis = setDate.getTime() - now.getTime();
    const min = 1000 * 60;
  
    const h = Math.floor(dis / (min * 60 * 24));
    const m = Math.floor((dis % (min * 60 * 24)) / (min * 60));
    const d = Math.floor((dis % (min * 60)) / min);
    const s = Math.floor((dis % min) / 1000);
  
    const [day, setDay] = useState(h);
    const [hour, setHour] = useState(m);
    const [minutes, setMinutes] = useState(d);
    const [seconds, setSeconds] = useState(s);
  
    useEffect(() => {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            if (parseInt(hour) === 0) {
              if (parseInt(day) === 0) {
                clearInterval(countdown);
              } else {
                setDay(parseInt(day) - 1)
                setHour(23)
                setMinutes(59)
                setSeconds(59)
              }
            } else {
              setHour(parseInt(hour) - 1)
              setMinutes(59)
              setSeconds(59)
            }
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }, [day, hour, minutes, seconds]);


    return (
        <figure id="opening" className="myScroll">
            <h1></h1>
            <h1>Opening in</h1>
            <p>Our website is comming to live soon</p>
            <p>Stay tune with us</p>
            <h3>{day}</h3> <span> : </span> 
            <h3>{hour}</h3> <span> : </span>
            <h3>{minutes}</h3> <span> : </span>
            <h3>{seconds}</h3>
            <div className="openingInput">
                <input type="email" name="openingEmail" id="openingEmail" placeholder="Your E-mail address" />
                <button>Subscribe</button>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ipsa!</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </figure>
    )
}