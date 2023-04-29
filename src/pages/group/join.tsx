import styles from "../../styles/JoinGroup.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "@/components/Cookie";

export default function JoinGroup() {
  const [code, setCode] = useState("");
  const codeHandler = (e: any) => {
    setCode(e.currentTarget.value);
  };
  const join = async (code: string) => {
    const token = getCookie("token");
    const base64url = token.split(".")[1];
    const base64 = base64url.replace("-", "+").replace("_", "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const jsonData = JSON.parse(jsonPayload);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const request = await axios
      .post(`https://controlz-test.com/group/join?user_uuid=${jsonData.user_uuid}&join_code=${code}`)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          window.location.href = "/group";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const send = () => {
    join(code);
  };
  return (
    <div className={styles.group_div}>
      <div className={[styles.container, "group-div"].join(" ")}>
        <h1 className={styles.title}>그룹 가입하기</h1>
        <div className={styles.join_div}>
          <div className={styles.join_input_div}>
            <input type="text" placeholder="그룹 코드를 입력하세요!" onChange={codeHandler} className={styles.join_input} />
          </div>
          <button className={styles.group_join_btn} onClick={send}>
            가입하기
          </button>
          <p className={styles.group_create_ment}>혹은</p>
          <Link href="/group/create" className={styles.group_create_btn}>
            새로운 그룹 생성하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
