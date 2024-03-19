// pages/api/settings.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Placeholder for your settings storage. Replace this with actual persistence logic.
let settings: Record<string, string> = {
  email: "",
  password: "",
  emailRecipients: "",
  smsRecipients: "",
  twilio_account_sid: "",
  twilio_auth_token: "",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      // Return all settings
      res.status(200).json(settings);
      break;
    
    case 'POST':
      // Update settings with the provided key and value
      const { key, value } = body;
      if (key in settings) {
        settings[key] = value;
        res.status(200).json({ message: `Setting ${key} updated successfully.` });
      } else {
        // Key not found in settings
        res.status(404).json({ message: `Setting ${key} not found.` });
      }
      break;

    default:
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
