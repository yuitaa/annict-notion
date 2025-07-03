export class NotionAnimeProperties {
  constructor(
    title,
    id,
    status,
    released_on,
    media_text,
    official_site_url,
    twitter_username,
    images,
  ) {
    this.title = title;
    this.id = id;
    this.status = status;
    this.released_on = released_on;
    this.media_text = media_text;
    this.official_site_url = official_site_url;
    this.twitter_username = twitter_username;
    this.images = images;
  }

  toJSON() {
    const result = {};

    if (this.title) {
      result["タイトル"] = {
        "title": [
          {
            "text": {
              "content": this.title
            }
          }
        ]
      };
    }
    if (this.id !== undefined && this.id !== null) {
      result["id"] = {
        "number": this.id
      };
    }
    if (this.status) {
      result["ステータス"] = {
        "select": {
          "name": this.status
        }
      };
    }
    if (this.released_on) {
      result["リリース時期"] = {
        "select": {
          "name": this.released_on
        }
      };
    }
    if (this.media_text) {
      result["メディア"] = {
        "select": {
          "name": this.media_text
        }
      };
    }
    if (this.official_site_url) {
      result["公式サイト"] = {
        "url": this.official_site_url
      };
    }
    if (this.twitter_username) {
      result["公式Twitter"] = {
        "url": `https://twitter.com/${this.twitter_username}`
      };
    }
    if (Array.isArray(this.images) && this.images.length > 0) {
      result["画像"] = {
        "files": this.images.map(url => ({
          "type": "external",
          "name": "visual",
          "external": { "url": url }
        }))
      };
    }

    return result;
  }
}