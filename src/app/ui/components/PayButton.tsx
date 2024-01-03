'use client'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const CLIENT_ID = 'AaPZaRbhL9psl2ql2kOBXuJOIoDfutz19HE2HDE2Mnm6hpyG5tDvDzv3FcFm4Kmn2VW8W2lJ281J1fuY'

export default function PayButton() {
    return (
        <PayPalScriptProvider
            options={{
                clientId: CLIENT_ID,
            }}
        >
            <PayPalButtons
                style={{ layout: "horizontal", label: "pay" }}
                createOrder={async () => {
                    const res = await fetch('/api/checkout', {
                        method: 'POST',
                    });
                    const order = await res.json();
                    return order.id;
                }}
            />
        </PayPalScriptProvider>
    )
}