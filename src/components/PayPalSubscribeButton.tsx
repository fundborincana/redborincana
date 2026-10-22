"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PayPalButtons = { render: (el: HTMLElement) => Promise<void>; close: () => void };

declare global {
  interface Window {
    paypal?: { Buttons: (options: unknown) => PayPalButtons };
  }
}

const SDK_ID = "paypal-sdk";

function loadSdk(clientId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.paypal) return resolve();
    let script = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SDK_ID;
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&vault=true&intent=subscription`;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("No se pudo cargar PayPal")));
  });
}

export default function PayPalSubscribeButton({
  clientId,
  planId,
  successHref,
}: {
  clientId: string;
  planId: string;
  successHref: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let buttons: PayPalButtons | undefined;
    let cancelled = false;

    loadSdk(clientId)
      .then(() => {
        if (cancelled || !container.current || !window.paypal) return;
        buttons = window.paypal.Buttons({
          style: { shape: "rect", color: "gold", layout: "vertical", label: "subscribe" },
          createSubscription: (
            _data: unknown,
            actions: { subscription: { create: (o: { plan_id: string }) => Promise<string> } }
          ) => actions.subscription.create({ plan_id: planId }),
          onApprove: () => {
            router.push(successHref);
          },
        });
        return buttons.render(container.current);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      buttons?.close();
    };
  }, [clientId, planId, successHref, router]);

  if (failed) {
    return (
      <p className="membresia-note">
        No pudimos cargar el botón de pago. Recarga la página o escríbenos a redborincana@fundacionborincana.org.
      </p>
    );
  }

  return <div ref={container} />;
}
