import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID ?? '';
const clientSecret = process.env.PAYPAL_SECRET ?? '';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
    const request = new paypal.orders.OrdersCreateRequest().requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '1000.00',
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: '1000.00'
                    },
                    shipping: {
                        currency_code: 'USD',
                        value: '0.00'
                    },
                    handling: {
                        currency_code: 'USD',
                        value: '0.00'
                    },
                    tax_total: {
                        currency_code: 'USD',
                        value: '0.00'
                    },
                    shipping_discount: {
                        currency_code: 'USD',
                        value: '0.00'
                    },
                    discount: {
                        currency_code: 'USD',
                        value: '0.00'
                    },
                    insurance: {
                        currency_code: 'USD',
                        value: '0.00'
                    }

                }
            },
            items: [
                {
                    name: 'item',
                    category: 'PHYSICAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '1000.00',
                    },
                    quantity: '1',
                }
            ]
        }]
    });

    const elalan = await client.execute(request);

    return new Response(JSON.stringify(elalan.result), {
        status: 200,
    })
} 