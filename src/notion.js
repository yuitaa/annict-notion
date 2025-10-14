import axios from 'axios';
import { statusText, NOTION_TOKEN, NOTION_DB_ID } from './config.js';

export class NotionAnimeProperties {
  constructor(
    title,
    id,
    status,
    season_name_text,
    media_text,
    official_site_url,
    twitter_username,
    images,
  ) {
    this.title = title;
    this.id = id;
    this.status = status;
    this.season_name_text = season_name_text;
    this.media_text = media_text;
    this.official_site_url = official_site_url;
    this.twitter_username = twitter_username;
    this.images = images;
  }

  toJSON() {
    const result = {};

    if (this.title) {
      result['タイトル'] = {
        title: [
          {
            text: {
              content: this.title,
            },
          },
        ],
      };
    }
    if (this.id !== undefined && this.id !== null) {
      result['id'] = {
        number: this.id,
      };
    }
    if (this.status) {
      result['ステータス'] = {
        select: {
          name: this.status,
        },
      };
    }
    if (this.season_name_text) {
      result['シーズン'] = {
        select: {
          name: this.season_name_text,
        },
      };
    }
    if (this.media_text) {
      result['メディア'] = {
        select: {
          name: this.media_text,
        },
      };
    }
    if (this.official_site_url) {
      result['公式サイト'] = {
        url: this.official_site_url,
      };
    }
    if (this.twitter_username) {
      result['公式Twitter'] = {
        url: `https://twitter.com/${this.twitter_username}`,
      };
    }
    if (Array.isArray(this.images) && this.images.length > 0) {
      result['画像'] = {
        files: this.images.map((url) => ({
          type: 'external',
          name: 'visual',
          external: { url: url },
        })),
      };
    }

    return result;
  }
}

export async function createNewAnimePage(data) {
  const url = 'https://api.notion.com/v1/pages/';

  async function getPictures(id) {
    const endpoint = `https://api.jikan.moe/v4/anime/${id}/pictures`;
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const imagesData = await getPictures(data.mal_anime_id);
  const images = imagesData?.data
    ?.map((img) => img.webp?.image_url)
    ?.filter((url) => url !== undefined);
  if (
    data.images?.facebook?.og_image_url &&
    data.images.facebook.og_image_url.startsWith('https://')
  ) {
    images.unshift(data.images.facebook.og_image_url);
  }

  const properties = new NotionAnimeProperties(
    data?.title,
    data?.id,
    statusText[data?.status?.kind],
    data?.season_name_text,
    data?.media_text,
    data?.official_site_url,
    data?.twitter_username,
    images,
  );

  const notionResponse = await axios.post(
    url,
    {
      parent: { database_id: NOTION_DB_ID },
      properties: properties.toJSON(),
    },
    {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    },
  );

  return notionResponse.data;
}

export function editAnimePage(id, data) {
  const url = `https://api.notion.com/v1/pages/${id}`;
  const properties = new NotionAnimeProperties(
    data?.title,
    data?.id,
    statusText[data?.status?.kind],
    data?.season_name_text,
    data?.media_text,
    data?.official_site_url,
    data?.twitter_username,
    data?.images,
  );

  return axios.patch(
    url,
    {
      properties: properties.toJSON(),
    },
    {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    },
  );
}
