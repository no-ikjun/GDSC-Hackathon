import styles from "../../styles/Group.module.css";
import Link from "next/link";
import GroupInfo from "@/components/GroupInfo";
import { getCookie } from "@/components/Cookie";
import axios from "axios";
import { useEffect, useState } from "react";

interface userData {
  user_name: string;
}

interface groupData {
  group_name: string;
  created_At: string;
  group_uuid: string;
  group_code: string;
  users: userData[];
}

export default function Group() {
  const [groups, setGroups] = useState([]);
  const fetchUser = async () => {
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
    const response = await axios.get(`https://controlz-test.com/qna/my_info?user_uuid=${jsonData.user_uuid}`);
    setGroups(response.data[0].groups);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>나의 그룹</h1>
        {groups.map((group: groupData) => {
          const temp = group.users;
          const arr = [];
          for (var i = 0; i < temp.length; i++) {
            arr.push(temp[i].user_name);
          }
          return <GroupInfo name={group.group_name} date={group.created_At.split("T")[0]} members={arr} code={group.group_uuid} key={group.group_uuid} />;
        })}
        <div className={styles.group_info_div} style={{ height: 200, display: "inline-flex", textAlign: "center" }}>
          <Link href="/group/join" className={styles.group_create_btn}>
            + 그룹 추가하기
          </Link>
        </div>
      </div>
    </div>
  );
}
