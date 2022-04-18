import Link from "next/link";

const BackToHome = () => {
  return (
    <Link href="/">
      <a
        style={{
          display: "block",
          paddingBlock: "1rem",
        }}>
        &larr;&nbsp;
        <span
          style={{
            textDecoration: "underline",
          }}>
          Back to Home
        </span>
      </a>
    </Link>
  );
};

export default BackToHome;
