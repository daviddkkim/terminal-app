// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data = [
        {
            id:1,
            name: 'about'
        },
        {
            id:2,
            name: 'work'
        },
        {
            id:3,
            name: 'resume'
        }
    ]
    res.status(200).json(data)
}
