let { UserSession, Stores } = require('../models')
const jwt = require('jsonwebtoken');
const config = require('../config/index');

async function revokeUserSession(employe) {

  await UserSession.destroy({
    where: {
      userId: employe.id
    }
  })
}

async function createUserSession(employe) {
  const data = {
    id: employe.id,
    firstName: employe.firstName,
    role: employe.role
  };
  const exp = Math.floor(Date.now() / 1000) + 157784760000;
  const refreshToken = jwt.sign(data, config.JWT_SECRET);
  const accessToken = jwt.sign({ exp, data }, config.JWT_SECRET);
  try {
    const session = await UserSession.create({ refreshToken, accessToken, userId: employe.id })

    if (session) {
      return {
        accessToken: session.accessToken,
        accessTokenExpiresAt: exp,
        refreshToken: session.refreshToken
      }
    }
  } catch (e) {
    return e;
  }
}

async function updateStore(body, res) {

  const store = {};

  if (body.hasOwnProperty('name')) {
    store['name'] = body.name;
  }

  if (body.hasOwnProperty('location')) {
    store['location'] = body.location;
  }

  if (Object.keys(store).length > 0) {
    return await Stores.update({ ...store }, { where: { id: body.store_id } })
  } else {
    return res.status(400).json({ message: "provide at least one attribute." });
  }

}

module.exports = {
  revokeUserSession,
  createUserSession,
  updateStore
}