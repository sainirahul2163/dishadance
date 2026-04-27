import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { payment_id, amount } = req.body ?? {}

  if (!payment_id || !amount) {
    return res.status(400).json({ error: 'Missing payment_id or amount' })
  }

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    console.error('Razorpay credentials missing in environment')
    return res.status(500).json({ error: 'Server misconfigured: Razorpay keys not set' })
  }

  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  try {
    const response = await fetch(
      `https://api.razorpay.com/v1/payments/${payment_id}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100, currency: 'INR' }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Razorpay capture error:', data)
      return res.status(400).json({ error: data })
    }

    return res.status(200).json({ success: true, data })
  } catch (err) {
    console.error('Capture failed:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}