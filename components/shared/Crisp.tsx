"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = ({ user }: any) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
      console.error("NEXT_PUBLIC_CRISP_WEBSITE_ID is not set."); // Vérifiez que NEXT_PUBLIC_CRISP_WEBSITE_ID est défini
      return;
    }
    console.log(user);
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID, {
      autoload: false,
    }); // Configure Crisp avec l'identifiant du site
    Crisp.user.setEmail(user.email);
    Crisp.user.setNickname(user.name);

    Crisp.session.setData({
      user_id: user.id,
      plan: user.plan,
    });
    Crisp.load(); // Indique à Crisp de charger le script dès qu'il est configuré
  }, []);

  return null;
};

export default CrispChat;
