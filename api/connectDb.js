import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
export async function connectDb() {
  const uri = `mongodb+srv://${process.env.mongoose_username}:${process.env.mongoose_password}@vinod-cluster.wknk7.mongodb.net/shortenUrl`;
  await mongoose.connect(uri);
}

let urlSchema = new mongoose.Schema({
  hash: String,
  url: String,
});
let urlMdl = mongoose.model("urls", urlSchema);

export async function searchDb(hash) {
  let check = await urlMdl.find({ hash: hash });
  if (!!check.length) return { search: !!check.length, url: check[0].url };
  return { search: false, url: "No url" };
}

export async function storeIndb(hash, orgurl) {
  let search = await searchDb(hash);
  if (!search?.search) {
    let url = new urlMdl({ hash: hash, url: orgurl });
    await url.save();
    console.log("Saved in db");
    return;
  } else console.log("Found hash in db for url", orgurl);
}
