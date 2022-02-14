import Header from "../common/Header";
import News from "./News";
import Intro from "./Intro";
import Visual from "./Visual";

export default function Main() {
    return (
        <>
        <Header type={'main'} />
        <Visual />
        <Intro />
        <News />
        </>
    )
}