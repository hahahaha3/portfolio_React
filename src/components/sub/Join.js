import { useEffect, useRef, useState } from "react";

export default function Join() {
    let main = useRef(null);
    const path = process.env.PUBLIC_URL;
    const initVal = {
        userid: '',
        pwd1: '',
        pwd2: '',
        email: '',
        comment: '',
        gender: 'false',
        interests: 'false',
        city:  'false',
    }

    // useState로 초기 value값을 state에 담아서 관리 시작 , 인증처리하기 위해서 생성
    const [val, setVal] = useState(initVal);
    // input에 인증 실패시 출력될 에러메세지를 담을 state 생성
    const [err, setErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [success, setSuccess] = useState(false);

    // input의 상태값이 변경될때마다 실행될 함수
    const handleChange = e => {
        // input요소의 name값과 value값을 구조분해 할당으로 가져옴
        const {name, value} = e.target;
        // 해당 함수가 실행될때마다(onChange 발생시) 기존 val state값을 현재 사용자가 입력하는 값으로 갱신
        setVal({...val, [name]: value});
        //console.log(val);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmit(true);
        // 인증처리 함수를 호출해서 인증 실패시 err state 객체에 에러문구 추가
        // check 함수에 인수로 기존 err state를 인수로 전달
        // setErr 는 참조형 자료여서
        setErr(check(val));
    }

    const handleReset = () => {
        setVal(initVal);
        setErr({});
        setIsSubmit(false);
    }

    const handleRadio = e => {    
        const {name} = e.target;
        const isCheck = e.target.checked;   
        setVal({...val, [name]: isCheck});
    }
    
    const handleCheck = e => {
        let isChecked = false;
        const {name} = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input');
        inputs.forEach(el=>{
        if(el.checked) isChecked=true;
        });         
        setVal({...val, [name]: isChecked});    
    }

    const handleSelect = e => {
        const {name} = e.target;
        const isSelected = e.target.options[e.target.selectedIndex].value;
        setVal({...val, [name]: isSelected});
    }

    //에러 객체를 반환하는 함수
    const check = val => {
        // 객체로 만들어주고
        let errs = {}
        // 인수로 받은 val의 조건에 부합하면
        const eng = /[a-zA-z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_+]/;

        if( val.userid.length < 5 ) {
            // 빈 err객체에 userid에 해당하는 에러 객체를 추가
            errs.userid = 'ID를 5글자 이상 입력하세요';
        }
        if ( val.pwd1 < 5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1) ) {
            errs.pwd1 = '비밀번호는 5글자 이상 같게 입력하세요'
        }
        if( val.pwd1 !== val.pwd2 ) {
            errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요'
        }
        if( val.email.length < 8 || !/@/.test(val.email)){
            errs.email = '이메일 주소는 8글자 이상 @를 포함하여 입력하세요';
        }
        if ( !val.gender ) {
            errs.gender = '성별을 선택하세요';
        }
        if ( !val.interests ) {
            errs.interests = '관심사를 하나이상 선택하세요';
        }
        if( !val.city ) {
            errs.city = '사는곳을 선택해주세요';
        }
        if( val.comment.length < 10 ) {
            errs.comment = '남기는 말을 10글자 이상 입력하세요';
        }
        return errs;
    }

    useEffect(() => {
        main.current.classList.add('on');
    }, []);

    // err state값 (setErr)이 변경될때마다 동작하는 함수
    useEffect(() => {
        console.log(err);
        // err 객체의 key값의 갯수를 반환
        const len = Object.keys(err).length;
        
        if(len === 0 && isSubmit) {
            setSuccess(true)
        } else {
            setSuccess(false);
        }
    }, [err]);


    return(
        <main className="content join" ref={main}>
            <figure id="sub_main">
                <h1 className="txtFirst"> It's registration</h1>
                <h1 className="txtSecond">Lorem, ipsum.</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
            </figure>
            <div className="inner">
                <section>
                <img src={`${path}/img/join.jpeg`} className="join_img"/>
                    {success ? <div className="success">회원가입을 축하합니다</div> : null}
                    {/* submit 이벤트 발생시 함수호출 */}
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="h">회원가입 폼 양식</legend>
                            <h1>RESISTRATION</h1>
                            <table>
                                <caption className="h">회원가입 입력</caption>
                                <tbody>
                                    {/* userid */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="userid">USER ID</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="text" 
                                                id="userid" 
                                                name="userid" 
                                                placeholder="아이디를 입력하세요"
                                                // 실제 state값이 변경되어야지 input창에 값 출력
                                                value={val.userid}
                                                onChange={handleChange}
                                            />
                                            <span className="err">{err.userid}</span>
                                        </td>
                                    </tr>
                                    {/* pwd */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="pwd1">PASSWORD</label>
                                        </th>
                                        <td>
                                            <input 
                                            type="password" 
                                            name="pwd1"
                                            id="pwd1"
                                            placeholder="비밀번호를 입력하세요"
                                            value={val.pwd1}
                                            onChange={handleChange}
                                            />
                                            <span className="err">{err.pwd1}</span>
                                        </td>
                                    </tr>
                                    {/* re-pwd */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="pwd2">RE-PASSWORD</label>
                                        </th>
                                        <td>
                                            <input 
                                            type="password" 
                                            name="pwd2"
                                            id="pwd2"
                                            placeholder="비밀번호를 재입력하세요"
                                            value={val.pwd2}
                                            onChange={handleChange}
                                            />
                                            <span className="err">{err.pwd2}</span>
                                        </td>
                                    </tr>
                                    {/* email */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="email">E-MAIL</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="text" 
                                                id="email" 
                                                name="email" 
                                                placeholder="이메일을 입력하세요"
                                                // 실제 state값이 변경되어야지 input창에 값 출력
                                                value={val.email}
                                                onChange={handleChange}
                                            />
                                            <span className="err">{err.email}</span>
                                        </td>
                                    </tr>
                                    {/* gender */}
                                    <tr>
                                        <th scope='row'>
                                        GENDER
                                        </th>
                                        <td>
                                        <label htmlFor="female">Female</label>
                                        <input 
                                            type="radio"
                                            id='female'
                                            name='gender'
                                            onChange={handleRadio} 
                                        />
                                        <label htmlFor="male">Male</label>
                                        <input 
                                            type="radio" 
                                            id='male'
                                            name='gender'
                                            onChange={handleRadio}
                                        />
                                        <span className="err">{err.gender}</span>
                                        </td>
                                    </tr>
                                    {/* interests */}
                                    <tr>
                                        <th scope="row">INTERESTS</th>
                                        <td>
                                            <label htmlFor="sports">Sports</label>
                                            <input 
                                                type="checkbox" 
                                                id="sports"
                                                name="interests"
                                                onChange={handleCheck}
                                            />
                                            <label htmlFor="movie">Movie</label>
                                            <input 
                                                type="checkbox" 
                                                id="movie"
                                                name="interests"
                                                onChange={handleCheck}
                                            />
                                            <label htmlFor="reading">Reding</label>
                                            <input 
                                                type="checkbox" 
                                                id="reading"
                                                name="interests"
                                                onChange={handleCheck}
                                            />
                                            <span className="err">{err.interests}</span>
                                        </td>
                                    </tr>
                                    {/* city */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="cidy">CITY</label>
                                        </th>
                                        <td>
                                            <select name="city" id="city" onChange={handleSelect}>
                                                <option value="">사는곳을 선택하세요</option>
                                                <option value="seoul">서울</option>
                                                <option value="gyeonggi">경기</option>
                                                <option value="pusan">부산</option>
                                                <option value="jeju">제주</option>
                                            </select>
                                            <span className="err">{err.city}</span>
                                        </td>
                                    </tr>
                                    {/* comments */}
                                    <tr>
                                        <th>
                                            <label htmlFor="comment">COMMENTS</label>
                                        </th>
                                        <td>
                                            <textarea 
                                                name="comment" 
                                                id="comment" 
                                                value={val.comment}
                                                onChange={handleChange}
                                                cols="30" 
                                                rows="10">
                                            </textarea>
                                            <span className="err">{err.comment}</span>
                                        </td>
                                    </tr>
                                    {/* btn */}
                                    <tr>
                                        <th colSpan="2" className="btnSet">
                                            <input type="reset" value="CANCEL" onClick={handleReset}/>
                                            <input type="submit" value="SUBMIT" />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    )
}