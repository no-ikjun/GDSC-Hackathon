import styles from "../../styles/JoinGroup.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie } from "@/components/Cookie";
import axios from "axios";
import Head from "@/components/Head";

const handleCopyClipboard = (text: string) => {
  const $textarea = document.createElement("textarea");
  document.body.appendChild($textarea);
  $textarea.value = text;
  $textarea.select();
  document.execCommand("copy");
  document.body.removeChild($textarea);
};

export default function CreateGroup() {
  const [name, setName] = useState("");
  const nameHandler = (e: any) => {
    e.preventDefault();
    const currName = e.currentTarget.value;
    setName(currName);
  };
  const create = async (name: string) => {
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
      .post(`https://controlz-test.com/group/create?user_uuid=${jsonData.user_uuid}&group_name=${name}`)
      .then((res) => {
        if (res.status === 201) {
          handleCopyClipboard(res.data.group_code);
          alert("그룹이 생성되었으며 그룹 코드가 클립보드에 복사되었습니다!\n그룹 코드 : " + res.data.group_code);
          window.location.href = "/group";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const send = () => {
    create(name);
  };
  return (
    <div className={styles.group_div}>
      <Head title="어스 | 그룹 생성" description="매일 하나의 질문이 만드는 세상" />
      <div className={[styles.container, "group-div"].join(" ")}>
        <h1 className={styles.title}>그룹 생성하기</h1>
        <div className={styles.join_div}>
          <div className={styles.join_input_div}>
            <input type="text" placeholder="그룹의 이름을 입력하세요!" onChange={nameHandler} className={styles.join_input} />
          </div>
          <button className={styles.group_join_btn} onClick={send}>
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
