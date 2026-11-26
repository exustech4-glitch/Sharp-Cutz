"use client";

import Script from "next/script";

const baseUrl = "https://vdk-viber-runtime-prod.bot.botpress.host";
const botId = "4c5397f9-efe2-434a-bb17-d9e731294686";

type WebchatWindow = Window & {
  VdkEdgeWebchat?: {
    mount: (config: Record<string, unknown>) => void;
  };
};

let mountRequest: Promise<void> | null = null;
let isMounted = false;

async function mountBotpressChat() {
  if (isMounted || mountRequest) return mountRequest;

  mountRequest = (async () => {
    try {
      const response = await fetch(`${baseUrl}/edge/bots/${botId}/config`);
      if (!response.ok) throw new Error(`Botpress configuration request failed (${response.status}).`);

      const { webchat } = (await response.json()) as { webchat?: Record<string, unknown> };
      const runtime = window as WebchatWindow;
      if (!webchat || !runtime.VdkEdgeWebchat) throw new Error("Botpress webchat configuration is unavailable.");

      runtime.VdkEdgeWebchat.mount({ ...webchat, mode: "bubble", baseUrl, botId });
      isMounted = true;
    } catch (error) {
      console.error("Sharp Cutz chat could not be loaded.", error);
      mountRequest = null;
    }
  })();

  return mountRequest;
}

export default function BotpressChat() {
  return <Script src={`${baseUrl}/edge/webchat.js`} strategy="afterInteractive" onReady={mountBotpressChat} />;
}
