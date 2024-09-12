async function genHash(msg) {
    let encode = new TextEncoder().encode(msg);
    let hash = await crypto.subtle.digest("SHA-256", encode);
    let arr = Array.from(new Uint8Array(hash));
    let hashRes = arr
      .map((num) => num.toString(16).padStart(2, "0"))
      .filter((k, i) => i % 4 == 0)
      .join("");
    return hashRes;
  }
  
  export default genHash;
  
  // genHash("https://expressjs.com/en/5x/api.html#req")
  