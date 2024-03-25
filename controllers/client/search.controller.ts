import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convert-to-slug.helper";

export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  
  let songs = [];
  
  if(songs) {
    const keywordRegex = new RegExp(keyword, "i");

    const slug = convertToSlug(keyword);
    const keywordSlugRegex = new RegExp(slug, "i");
    songs = await Song.find({
      $or: [
        {
          title: keywordRegex,
          deleted: false,
          status: "active"
        },
        {
          slug: keywordSlugRegex,
          deleted: false,
          status: "active"
        },
      ]
      
    })
  
    if(songs.length > 0) {
      for (const song of songs) {
        const infoSinger = await Singer.findOne({
          _id: song.singerId,
          deleted: false
        })
  
        song["infoSinger"] = infoSinger;
      }
    }
  }
  
  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: songs
  })
}