const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name, avatar_url, bio, login } = apiResponse.data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name: name || login,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })
    }

    return response.json(dev)
  },
  async update(request, response) {
    const { github_username, techs } = request.body
    let apiResponse

    try {
      const techsArray = parseStringAsArray(techs)
      const dev = await Dev.findOneAndUpdate(
        { github_username },
        { techs: techsArray },
        { new: true }
      )

      apiResponse = dev || {
        status: false,
        message: `Cannot find dev ${github_username}`
      }
    } catch (e) {
      apiResponse = {
        status: false,
        message: `Unable to update user \nError: ${e}`
      }
    }

    response.json(apiResponse)
  }
}
