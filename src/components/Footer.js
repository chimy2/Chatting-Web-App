import { useState, useEffect } from "react";

function Footer(props) {
  const [footer, setFooter] = useState("footer-main");
  useEffect(() => {
    props.login ? setFooter("footer") : setFooter("footer-main");
  }, [props.login]);
  return <footer className={footer}>Copyright 2020. Park So Hye. all rights reserved.</footer>;
}

export default Footer;
