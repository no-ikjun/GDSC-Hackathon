import { useRouter } from "next/router";
import styles from "../../styles/Group.module.css";
import Image from "next/image";
import Answer from "@/components/Answer";
import { getCookie } from "@/components/Cookie";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import GroupList from "@/components/GroupList";

export default function GroupHistory() {
  const router = useRouter();
  const group_id = router.query.id;

  const [groupName, setGroupName] = useState("");
  const [groupUuid, setGroupUuid] = useState("");
  const [question, setQuestion] = useState("");
  const [questionUuid, setQuestionUuid] = useState("");

  const getData_1 = useCallback(async () => {
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

    const response_1 = await axios
      .get(`https://controlz-test.com/qna/random`)
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data.question);
        setQuestionUuid(res.data.question_uuid);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response_2 = await axios
      .get(`https://controlz-test.com/group/info?group_uuid=${group_id}`)
      .then((res) => {
        console.log(res.data);
        setGroupName(res.data.group_name);
        setGroupUuid(res.data.group_uuid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [group_id]);

  const getData_2 = async () => {
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

    console.log("그룹 uid : " + groupUuid);

    const response_3 = await axios
      .get(`https://controlz-test.com/qna/answer?group_uuid=${groupUuid}&question_uuid=${questionUuid}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData_1();
  }, [getData_1]);

  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>{groupName}</h1>
        <div className={styles.question_div}>
          <div className={styles.arrow_div}>
            <Image src="/left-arrow.png" width={30} height={30} alt="arrow" className={styles.decrease_date} />
          </div>
          <div className={styles.question_info_div}>
            <p className={styles.question_date}>오늘의 질문</p>
            <p className={styles.question_content}>{question}</p>
          </div>
          <div className={styles.arrow_div}>
            <Image src="/right-arrow.png" width={30} height={30} alt="arrow" className={styles.increase_date} />
          </div>
        </div>
        <GroupList groupUuid={groupUuid} questionUuid={questionUuid} />
      </div>
    </div>
  );
}
