import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import axios from "axios";
import { setCookie, getCookie } from "@/components/Cookie";
import Image from "next/image";
import Head from "@/components/Head";

export default function Login() {
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    setWindowSize(window.innerHeight);
  }, []);

  // 입력 정보 관리
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");

  // 입력 정보 유효성 확인
  const [nameValid, setNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [ageValid, setAgeValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  let _valid = false;

  const nameHandler = (e: any) => {
    const currName = e.currentTarget.value;
    const NameReg = /^[가-힣a-zA-Z]+$/;
    _valid = NameReg.test(currName);
    if (currName === "") {
      setNameValid(false);
    } else if (_valid) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    setName(currName);
  };

  const idHandler = (e: any) => {
    const currId = e.currentTarget.value;
    const IdReg = /^[a-zA-Z0-9]*$/;
    _valid = IdReg.test(currId);
    if (currId === "") {
      setIdValid(false);
    } else if (_valid) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
    setId(currId);
  };

  const ageHandler = (e: any) => {
    const currAge = e.currentTarget.value;
    const AgeReg = /^[0-9]*$/;
    _valid = AgeReg.test(currAge);
    if (currAge === "") {
      setAgeValid(false);
    } else if (_valid) {
      setAgeValid(true);
    } else {
      setAgeValid(false);
    }
    setAge(currAge);
  };

  const nicknameHandler = (e: any) => {
    const currNickname = e.currentTarget.value;
    const NicknameReg = /^[가-힣a-zA-Z]+$/;
    _valid = NicknameReg.test(currNickname);
    if (currNickname === "") {
      setNicknameValid(false);
    } else if (_valid) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
    setNickname(currNickname);
  };

  const passwordHandler = (e: any) => {
    const currPassword = e.currentTarget.value;
    setPassword(currPassword);
  };

  const passwordConfirmHandler = (e: any) => {
    const currPasswordConfirm = e.currentTarget.value;
    setPasswordConfirm(currPasswordConfirm);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert("비밀번호를 다시 확인하세요.");
    } else if (!idValid || !ageValid || !nicknameValid) {
      return alert("입력 정보를 다시 확인하세요.");
    }
    let form = {
      user_name: name,
      nickname: nickname,
      age: age,
      user_id: id,
      user_password: password,
    };
    const request = axios
      .post("https://controlz-test.com/auth/user/register", form)
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head title="어스 | 회원가입" description="매일 하나의 질문이 만드는 세상" />
      <div className={[styles.login_div, "login-div"].join(" ")}>
        <div className={styles.login_child}>
          <div className={styles.login_child_div}>
            <div className={styles.login_child_ment_div}>
              <p className={styles.login_ment}>회원가입</p>
              <Link href="/login" className={styles.go_find}>
                ← 로그인 페이지로
              </Link>
            </div>
            <form onSubmit={onSubmit}>
              <div className={styles.input_div}>
                <input type="text" value={name} onChange={nameHandler} placeholder="이름(영문, 한글 2~6자)" className={[styles.input_form, styles.top].join(" ")} />
                <Image className={styles.check_img} src={`${nameValid ? "/check-button.png" : "/delete-button.png"}`} width={20} height={20} alt="check" />
              </div>
              <div className={styles.input_div}>
                <input type="text" value={id} onChange={idHandler} placeholder="아이디(영문, 숫자 2~10자)" className={[styles.input_form, styles.middle].join(" ")} style={{ borderTop: "none" }} />
                <Image className={styles.check_img} src={`${idValid ? "/check-button.png" : "/delete-button.png"}`} width={20} height={20} alt="check" />
              </div>
              <div className={[styles.input_div, styles.middle].join(" ")}>
                <input type="password" value={password} onChange={passwordHandler} placeholder="비밀번호" className={[styles.input_form, styles.middle].join(" ")} />
              </div>
              <div className={[styles.input_div, styles.middle].join(" ")}>
                <input type="password" value={passwordConfirm} onChange={passwordConfirmHandler} placeholder="비밀번호 확인" className={[styles.input_form, styles.middle].join(" ")} />
              </div>
              <div className={[styles.input_div, styles.middle].join(" ")}>
                <input type="number" value={age} onChange={ageHandler} placeholder="나이" className={[styles.input_form, styles.middle].join(" ")} min={0} max={100} />
                <Image className={styles.check_img} src={`${ageValid ? "/check-button.png" : "/delete-button.png"}`} width={20} height={20} alt="check" />
              </div>
              <div className={[styles.input_div, styles.bottom].join(" ")}>
                <input type="text" value={nickname} onChange={nicknameHandler} placeholder="닉네임" className={[styles.input_form, styles.bottom].join(" ")} style={{ borderTop: "none" }} />
                <Image className={styles.check_img} src={`${nicknameValid ? "/check-button.png" : "/delete-button.png"}`} width={20} height={20} alt="check" />
              </div>
              <div className={styles.login_btn_div}>
                <button className={styles.login_btn_real} formAction="" style={{ opacity: `${name && id && password && passwordConfirm && age && nickname ? "1" : "0.5"}` }}>
                  회원가입
                </button>
                <hr className={styles.login_hr} />
                <div className={styles.other_login_div}>
                  <Link href="/policy" className={styles.other_login_go} style={{ fontSize: 15 }}>
                    개인정보처리방침
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
