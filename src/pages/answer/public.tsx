import styles from "../../styles/Group.module.css";
import Link from "next/link";
import Image from "next/image";
import Answer from "@/components/Answer";
import PublicQuestion from "@/components/PublicQuestion";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/components/Cookie";
import { useRouter } from "next/router";
import Head from "@/components/Head";

interface Answer {
  answer: string;
  created_at: string;
  age: string;
}

export default function Public() {
  const now = new Date();

  function getTimeDiffFromNow(utcTime: string): string {
    const diffMs = now.getTime() - new Date(utcTime).getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);

    if (diffHour > 0) {
      return `${diffHour}시간 전`;
    } else {
      return `${diffMin}분`;
    }
  }

  const [answers, setAnswers] = useState<Answer[]>([]);

  const router = useRouter();
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const minHandler = (e: any) => {
    setAgeMin(e.target.value);
  };
  const maxHandler = (e: any) => {
    setAgeMax(e.target.value);
  };

  const getAnswers = async () => {
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

    if (ageMin === "" || ageMax === "") {
      return alert("나이대를 선택해주세요.");
    } else if (ageMin >= ageMax) {
      return alert("최소 나이대가 최대 나이대보다 큽니다.");
    } else {
      const query = router.query.question;
      const response = await axios
        .get(`https://controlz-test.com/qna/answer/public?question_uuid=${query}&lower=${ageMin}&upper=${ageMax}`)
        .then((res) => {
          const data = res.data;
          setAnswers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.group_div}>
      <Head title="어스 | 모두의 기록" description="매일 하나의 질문이 만드는 세상" />
      <div className={styles.container}>
        <h1 className={styles.title}>모두의 기록</h1>
        <div className={styles.question_div}>
          <PublicQuestion />
        </div>
        <div className={styles.public_age_div}>
          <select className={styles.public_age_select} onChange={minHandler} defaultValue={"default"}>
            <option value="default">나이대 선택</option>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대</option>
            <option value="70">70대</option>
          </select>
          <p className={styles.public_age_div_text}>~</p>
          <select className={styles.public_age_select} onChange={maxHandler} defaultValue={"default"}>
            <option value="default">나이대 선택</option>
            <option value="20">10대</option>
            <option value="30">20대</option>
            <option value="40">30대</option>
            <option value="50">40대</option>
            <option value="60">50대</option>
            <option value="70">60대</option>
            <option value="100">70대 이상</option>
          </select>
          <button className={styles.public_age_btn} onClick={getAnswers}>
            조회
          </button>
        </div>
        {answers.map((temp) => {
          return <Answer name={"익명의 누군가"} answer={temp.answer} key={temp.created_at} />;
          <hr className={styles.answer_hr} />;
        })}
      </div>
    </div>
  );
}
