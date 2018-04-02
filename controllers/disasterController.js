const nosql = require('../mongo/disasterNosql.js');

const getDisasterAlerts = () => {

    const validation = (req, res, next) => {
      req.check('limit', 'Empty').exists();
      req.check('limit', 'Needs to be a number').isNumeric();
  
      const errors = req.validationErrors();
      if (errors) res.status(422).send(errors);
      else return next();

      return true;
    };
  
    const getAlertsByLimit = (req, res) => {
        res.status(200).json({ title: 'Hello, World!' });
    };
  
    return {
        validation,
        getAlertsByLimit
    };
};
  
module.exports = {
    getDisasterAlerts
};