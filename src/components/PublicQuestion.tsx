import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./Cookie";
import { useRouter } from "next/router";
import styles from "../styles/Group.module.css";

export default function PublicQuestion() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [myAnswer, setMyAnswer] = useState("");
  const getData = async () => {
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
    console.log(router.query.question);
    const request_question = await axios
      .get(`https://controlz-test.com/qna/random?uuid=${router.query.question}`)
      .then((res) => {
        console.log(res);
        setQuestion(res.data.question);
      })
      .catch((err) => {
        console.log(err);
      });
    const request_answer = await axios
      .get(`https://controlz-test.com/qna/all/answer?user_uuid=${jsonData.user_uuid}`)
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].question.question_uuid === router.query.question) {
            setMyAnswer(res.data[i].answer);
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.question_info_div} style={{ width: "100%" }}>
      <p className={styles.question_date}>오늘의 질문</p>
      <p className={styles.question_content}>{question}</p>
      <p className={styles.question_date} style={{ marginTop: 30 }}>
        나의 답변
      </p>
      <p className={styles.question_content} style={{ fontSize: 20 }}>
        {myAnswer}
      </p>
    </div>
  );
}
