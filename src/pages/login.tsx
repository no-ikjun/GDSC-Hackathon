import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { setCookie, getCookie, removeCookie } from "@/components/Cookie";
import axios from "axios";

export default function Login() {
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    setWindowSize(window.innerHeight);
  }, []);

  const cookies = getCookie("token");
  if (cookies) {
    removeCookie("token");
    window.location.href = "/";
  }

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const idHandler = (e: any) => {
    const currId = e.currentTarget.value;
    setId(currId);
  };
  const pwHandler = (e: any) => {
    const currPw = e.currentTarget.value;
    setPw(currPw);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let form = {
      user_id: id,
      user_password: pw,
    };
    const request = axios
      .post("https://controlz-test.com/auth/login", form)
      .then((res) => {
        setCookie("token", res.data.registerJWTToken);
        window.location.href = "/";
      })
      .catch((err) => {
        window.alert("오류 발생. 다시 시도");
        console.log(err);
      });
  };
  return (
    <div>
      <div className={[styles.login_div, "login-div"].join(" ")}>
        <div className={styles.login_child}>
          <div className={styles.login_child_div}>
            <div className={styles.login_child_ment_div}>
              <p className={styles.login_ment}>로그인</p>
              <Link href="/find" className={styles.go_find}>
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <form onSubmit={onSubmit}>
              <div className={styles.input_div}>
                <input value={id} onChange={idHandler} type="text" placeholder="아이디" className={[styles.input_form, styles.top].join(" ")} />
              </div>
              <div className={[styles.input_div, styles.bottom].join(" ")}>
                <input value={pw} onChange={pwHandler} type="password" placeholder="비밀번호" className={[styles.input_form, styles.bottom].join(" ")} />
              </div>
              <div className={styles.login_btn_div}>
                <button className={styles.login_btn_real} formAction="" style={{ opacity: `${id && pw ? "1" : "0.5"}` }}>
                  로그인
                </button>
                <hr className={styles.login_hr} />
                <div className={styles.other_login_div}>
                  <Link href="/signup" className={styles.other_login_go}>
                    회원가입 →
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .login-div {
            height: ${windowSize}px;
          }
        `}
      </style>
    </div>
  );
}
