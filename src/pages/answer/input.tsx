import styles from "../../styles/AnswerInput.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, setCookie } from "@/components/Cookie";
import Head from "@/components/Head";

export default function InputAnswer() {
  const [answer, setAnswer] = useState("");
  const answerHandler = (e: any) => {
    setAnswer(e.currentTarget.value);
  };
  const [isCheck, setIsCheck] = useState(false);
  const checkHandler = (e: any) => {
    setIsCheck(!isCheck);
  };

  const [todayQuestionName, setTodayQuestionName] = useState("");
  const [todayQuestionUuid, setTodayQuestionUuid] = useState("");
  const getTodayQuestion = async () => {
    const response = await axios.get(`https://controlz-test.com/qna/random`);
    setTodayQuestionName(response.data.question);
    setTodayQuestionUuid(response.data.question_uuid);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
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
    const form = {
      question_uuid: todayQuestionUuid,
      user_uuid: jsonData.user_uuid,
      answer: answer,
      isPublic: isCheck,
    };
    const request = await axios
      .post(`https://controlz-test.com/qna/submit/answer`, form)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          window.location.href = "/answer";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodayQuestion();
  }, []);
  return (
    <div className={styles.input_div_main}>
      <Head title="어스 | 답변" description="매일 하나의 질문이 만드는 세상" />
      <div className={styles.container}>
        <h1 className={styles.title}>답변하기</h1>
        <div className={styles.input_div_sub}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p className={styles.ment_sub}>오늘의 질문</p>
            <p className={styles.ment}>{todayQuestionName}</p>
          </div>
          <div className={styles.input_div}>
            <input type="text" placeholder="오늘의 질문에 답변을 입력하세요!" onChange={answerHandler} className={styles.input} />
          </div>
          <span style={{ marginTop: 20, fontSize: 20, fontFamily: "sunshine_regular" }}>
            {" "}
            그룹 외의 사람들과 공유하기 <input type="checkbox" onClick={(e) => checkHandler(e)} onChange={checkHandler} checked={isCheck} />{" "}
          </span>
          <button className={styles.input_btn} onClick={onSubmit} style={{ backgroundColor: `${isCheck ? "#c882cc" : "#e59e98"}` }}>
            {isCheck ? "모두와 공유" : "그룹에만 공유"}
          </button>
        </div>
      </div>
    </div>
  );
}
