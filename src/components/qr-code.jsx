import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling-next";

export default function QRCode({ link, size = 200 }) {
  const qrRef = useRef(null);
  const qrCode = useRef(null);

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: link,
        dotsOptions: {
          color: "rgb(3,29,66)",
          type: "rounded",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "rgb(3,29,66)",
        },
        backgroundOptions: {
          color: "transparent",
        },
        imageOptions: {
          crossOrigin: "anonymous",
        },
      });

      qrCode.current.append(qrRef.current);
    } else {
      qrCode.current.update({ data: link});
    }
  }, [link, size]);

  return (
    <div ref={qrRef} className="order-1" />
  );
}
