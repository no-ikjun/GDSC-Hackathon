import Answer from "./Answer";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Group.module.css";
import { getCookie } from "./Cookie";

interface GroupListProps {
  groupUuid: string;
  questionUuid: string;
}

export default function GroupList({ groupUuid, questionUuid }: GroupListProps) {
  const [answerList, setAnswerList] = useState([]);

  const getData = useCallback(async () => {
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

    console.log(questionUuid);
    const response = await axios
      .get(`https://controlz-test.com/qna/answer/group?group_uuid=${groupUuid}&question_uuid=${questionUuid}`)
      .then((res) => {
        console.log(res.data);
        setAnswerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupUuid, questionUuid]);
  useEffect(() => {
    if (!groupUuid || !questionUuid) return;
    setTimeout(() => {
      getData();
    }, 3000);
  }, [getData, groupUuid, questionUuid]);

  return (
    <div>
      {answerList.map((answer) => {
        return (
          <div key={answer}></div>
          //<Answer name={answer.user_name} age={answer.user_age} answer={answer.answer} />
        );
      })}
      <Answer name="최익준" age="20대" answer="노래 듣기?" />
      <hr className={styles.answer_hr} />
      <Answer name="오다현" age="20대" answer="잠자기" />
      <hr className={styles.answer_hr} />
      <Answer name="이호성" age="10대" answer="굿굿" />
      <hr className={styles.answer_hr} />
    </div>
  );
}
