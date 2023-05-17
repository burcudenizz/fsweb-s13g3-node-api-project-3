const UserModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  console.log(`${new Date().toISOString()} ${req.method} to ${req.url}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let existUser = await UserModel.getById(req.params.id);
    if (!existUser) {
      res.status(404).json({ mesaj: "kullanıcı bulunamadı" });
    } else {
      req.user = existUser;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Hata!!" });
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ mesaj: "gerekli name alanı eksik" });
  } else {
    req.name = name;
    next();
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ mesaj: "gerekli text alanı eksik" });
  } else {
    req.text = text;
    next();
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
