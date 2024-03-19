// pages/api/submitForm.js
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      // Assuming the client is sending JSON data
      console.log(req.body); // Log the entire request body
      
      // You can access specific fields like this:
      // console.log(req.body.title);
      // console.log(req.body.severity);
  
      res.status(200).json({ message: 'Data received successfully' });
    } else {
      // Respond with a method not allowed error for non-POST requests
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  