import dotenv from 'dotenv';
dotenv.config();

export const ANNICT_TOKEN = process.env.ANNICT_TOKEN;
export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const NOTION_DB_ID = process.env.NOTION_DB_ID;

export const statusText = {
  wanna_watch: '見たい',
  watching: '見てる',
  watched: '見た',
  on_hold: '中断',
  stop_watching: '視聴中止',
};
