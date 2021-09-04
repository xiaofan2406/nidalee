const {resolve} = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [['nidalee', resolve(__dirname, '../src')]],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
