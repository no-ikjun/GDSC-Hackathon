import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    setWindowSize(window.innerHeight);
  }, []);
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
            <form>
              <div className={styles.input_div}>
                <input type="text" placeholder="아이디" className={[styles.input_form, styles.top].join(" ")} />
              </div>
              <div className={[styles.input_div, styles.bottom].join(" ")}>
                <input type="password" placeholder="비밀번호" className={[styles.input_form, styles.bottom].join(" ")} />
              </div>
              <div className={styles.login_btn_div}>
                <button className={styles.login_btn_real}>로그인</button>
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
