const crypto = require("crypto");
const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);
// D1EFDFB8DB832421B1E8F918FE29EBDCEC7C6492D3E56A8D3429936A60270529
// C012CB2DF2DF5084C751D80AFAED49EA99A375A4255728450FDF28A7A0776F26