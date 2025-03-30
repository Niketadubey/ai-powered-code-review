const aiService = require("../services/ai.service")


module.exports.getResponse = async (req, res)=> {

  const code = req.body.code;

  if(!code){
    return res.status(400).json({error: "prompt is required"})
  }

  const response = await aiService(code)
  res.send(response);
}