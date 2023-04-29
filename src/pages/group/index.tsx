import styles from "../../styles/Group.module.css";
import Link from "next/link";
import GroupInfo from "@/components/GroupInfo";

export default function Group() {
  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>나의 그룹</h1>
        <GroupInfo name="그루비룸" date="2023.04.29" members={["최익준", "오다현", "이호성"]} code="af34dD" />
        <GroupInfo name="새 그룹" date="2022.01.01" members={["최익준"]} code="adfae4" />
        <GroupInfo name="그루비룸" date="2023.04.29" members={["최익준", "오다현"]} code="432hsd" />
        <GroupInfo name="그루비룸" date="2023.04.29" members={["최익준"]} code="a52kd0" />
      </div>
      <div className={styles.new_group_div}>
        <Link href="/group/join" className={styles.group_create_btn}>
          + 그룹 추가하기
        </Link>
      </div>
    </div>
  );
}
