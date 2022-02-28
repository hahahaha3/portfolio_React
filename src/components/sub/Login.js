import React from "react";

  const Login = ({ authService }) => {
    const onLogin = event => {
      authService
        .login(event.currentTarget.textContent)
        .then(console.log);
    };

    return(
        <main className="content login">
            <figure id="sub_main">
                <h1 className="txtFirst"> It's Login</h1>
                <h1 className="txtSecond">Lo Login</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
            </figure>
              <section className="loginBox">
                <div className="inner">
                  <div className="loginBox">
                    <h1>LOGIN</h1>
                    <ul className="list">
                      <li className="item"><button onClick={onLogin}>Google</button></li>
                      <li className="item"><button onClick={onLogin}>Github</button></li>
                    </ul>
                  </div>
                </div>
              </section>
        </main>
    )
}

export default Login;