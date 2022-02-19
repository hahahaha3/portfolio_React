export default function Btns(props) {
    return (
        <ul id="btns">
            <div className="inner">
                <li className="on" onClick={() => props.getIndex(0)}></li>
                <li onClick={() => props.getIndex(1)}></li>
                <li onClick={() => props.getIndex(2)}></li>
                <li onClick={() => props.getIndex(3)}></li>
                <li onClick={() => props.getIndex(4)}></li>
                <li onClick={() => props.getIndex(5)}></li>
                <li onClick={() => props.getIndex(6)}></li>
                <li onClick={() => props.getIndex(7)}></li>
            </div>
        </ul>
    )
}