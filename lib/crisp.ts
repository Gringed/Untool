import React, { useEffect } from "react";
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}
const CrispChatScript = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "fb1508f2-4569-4bb3-874d-7f9d8f111760";
    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  return null; // Ce composant n'a pas de rendu, il ne retourne rien
};

export default CrispChatScript;
