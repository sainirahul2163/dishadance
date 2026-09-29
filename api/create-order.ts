import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, plan } = req.body ?? {}

  if (!amount || !plan) {
    return res.status(400).json({ error: 'Missing amount or plan' })
  }

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    console.error('Razorpay credentials missing in environment')
    return res.status(500).json({ error: 'Server misconfigured: Razorpay keys not set' })
  }

  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: 'INR',
        payment_capture: 1,
        notes: {
          plan:
            plan === '4'
              ? 'Starter Plan - 4 Sessions'
              : plan === 'kids'
                ? 'Kids Plan - 8 Sessions (Age 7+)'
                : 'Pro Plan - 8 Sessions',
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Razorpay order creation failed:', data)
      return res.status(400).json({ error: data })
    }

    return res.status(200).json({ orderId: data.id })
  } catch (err) {
    console.error('Create order error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}