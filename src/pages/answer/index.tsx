import { useEffect, useState } from "react";
import styles from "../../styles/Answer.module.css";
import Link from "next/link";
import IndexPage from "@/components/Head";
import { getCookie } from "@/components/Cookie";
import axios from "axios";
import { useRouter } from "next/router";

function generateRandomString(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export default function Answer() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [questionData, setQuestionData] = useState<string[]>([]);

  const getQuestion = async () => {
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
    const response = await axios
      .get(`https://controlz-test.com/qna/all/answer?user_uuid=${jsonData.user_uuid}`)
      .then((res) => {
        console.log(res);
        const temp_data = res.data;
        let str = "";
        for (var i = 0; i < temp_data.length; i++) {
          str =
            str +
            "%%%" +
            temp_data[i].answer +
            "&&&" +
            temp_data[i].created_At.split("-")[2].split("T")[0] +
            "&&&" +
            temp_data[i].question.question +
            "&&&" +
            temp_data[i].status +
            "&&&" +
            temp_data[i].question.question_uuid;
        }
        setQuestionData(str.split("%%%"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className={styles.answer_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>나의 답변 기록</h1>
        <h2 className={styles.answer_month}>4월</h2>
        <div className={styles.answer_list_div}>
          {questionData.map((item) => {
            if (item === "") return null;
            else {
              const temp_arr = item.split("&&&");
              //console.log(temp_arr);
              let randomString = generateRandomString(10);
              return (
                <>
                  <div className={styles.answer_list} key={`${randomString}`}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span className={styles.answer_list_date}>{temp_arr[1]}일</span>
                        <p
                          className={styles.answer_list_question}
                          onClick={() => {
                            answer !== `${randomString}` ? setAnswer(`${randomString}`) : setAnswer("");
                          }}
                        >
                          Q. {temp_arr[2]}
                        </p>
                      </div>
                      <p className={styles.answer_list_answer} style={{ display: `${answer === `${randomString}` ? "" : "none"}` }}>
                        A. {temp_arr[0]}
                      </p>
                    </div>
                    <Link href={`/answer/public?question=${temp_arr[4]}`} className={styles.answer_list_range} style={{ display: `${temp_arr[3] === "public" ? "block" : "none"}` }}>
                      다른 의견 보기 →
                    </Link>
                  </div>
                  <hr className={styles.answer_list_hr} />
                </>
              );
            }
          })}
          <div className={styles.answer_list}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className={styles.answer_list_date}>29일</span>
                <p
                  className={styles.answer_list_question}
                  onClick={() => {
                    answer !== "1" ? setAnswer("1") : setAnswer("");
                  }}
                >
                  Q. 오늘 먹은 음식은 무엇인가요?
                </p>
              </div>
              <p className={styles.answer_list_answer} style={{ display: `${answer === "1" ? "block" : "none"}` }}>
                A. 오늘은 이것과 저것을 먹었습니다. 정말 맛있었습니다.
              </p>
            </div>
            <Link href="/answer/public?question=af69319d-c601-4147-bf30-19edea518378" className={styles.answer_list_range}>
              다른 의견 보기 →
            </Link>
          </div>
          <hr className={styles.answer_list_hr} />
        </div>
      </div>
    </div>
  );
}
