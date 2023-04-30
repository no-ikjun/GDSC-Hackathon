import Answer from "./Answer";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Group.module.css";
import { getCookie } from "./Cookie";

interface GroupListProps {
  groupUuid: string;
  questionUuid: string;
}

export default function GroupList({ groupUuid, questionUuid }: GroupListProps) {
  const [answerList, setAnswerList] = useState([]);

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

    console.log(groupUuid);
    const response = await axios
      .get(`https://controlz-test.com/qna/answer/group?group_uuid=${groupUuid}&question_uuid=${questionUuid}}`)
      .then((res) => {
        console.log(res.data);
        //setAnswerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  return (
    <div>
      <Answer name="최익준" age="30대" answer="아니 프엔 개발을 혼자 하는게 말이 된다고 생각함?" />
      <hr className={styles.answer_hr} />
      <Answer name="오다현" age="20대" answer="아 자고싶다" />
      <hr className={styles.answer_hr} />
      <Answer name="이호성" age="10대" answer="저기서 데이터가 빈 칸일 경우에는 changed date에서 ... " />
      <hr className={styles.answer_hr} />
    </div>
  );
}
