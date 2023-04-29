import styles from "../styles/Group.module.css";
import Image from "next/image";

interface GroupInfoProps {
  name: string;
  date: string;
  members: string[];
  code: string;
}

export default function GroupInfo({ name, date, members, code }: GroupInfoProps) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("클립보드에 복사되었습니다.\n그룹 코드를 공유해주세요!");
  };
  return (
    <div className={styles.group_info_div}>
      <h2 className={styles.group_info_title}>{name}</h2>
      <p className={styles.group_info_date}>Since {date}</p>
      <p className={styles.group_info_member_title}>그룹 참여자</p>
      <div style={{ display: "inline-flex", width: "100%", overflowX: "auto" }}>
        {members.map((member_name: string) => {
          return (
            <div className={styles.group_info_member_div} key={member_name}>
              <div className={styles.group_info_member_img_div}>
                <Image src="/profile.png" width={30} height={30} alt="profile" />
              </div>
              <span className={styles.group_info_member_name}>{member_name}</span>
            </div>
          );
        })}
      </div>
      <button className={styles.group_info_member_invite} onClick={copyCode}>
        초대하기
      </button>
    </div>
  );
}
