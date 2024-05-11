import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SPREADSHEET_ID = '1nmleRPBIENBzo4G8wCgt7LrtRalN-vVleF2PWCBXPfI';
const RANGE = 'Sheet1!F1:K50500';

const credentialsPath = process.cwd() + '/credentials.json';
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export default async function handler(req, res) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const values = response.data.values;
    res.status(200).json(values);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from Google Sheets' });
  }
}