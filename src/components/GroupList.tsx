import Answer from "./Answer";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Group.module.css";
import { getCookie } from "./Cookie";

interface GroupListProps {
  groupUuid: string;
  questionUuid: string;
}

interface Answer {
  answer: string;
  nickname: string;
}

export default function GroupList({ groupUuid, questionUuid }: GroupListProps) {
  const [answerList, setAnswerList] = useState<Answer[]>([]);

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
    }, 1000);
  }, [getData, groupUuid, questionUuid]);

  return (
    <div>
      {answerList.map((answer) => {
        return (
          <>
            <Answer name={answer.nickname} answer={answer.answer} />
            <hr className={styles.answer_hr} />
          </>
        );
      })}
    </div>
  );
}
