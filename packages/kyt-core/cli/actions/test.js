// Command to run tests with Jest

const clone = require('lodash.clonedeep');
const jest = require('jest');
const shell = require('shelljs');
const { srcPath } = require('kyt-utils/paths')();
const jestConfigBuilder = require('../../config/jest');
const buildConfigs = require('../../utils/buildConfigs');

module.exports = (config, flags) => {
  // Comment the following to see verbose shell ouput.
  shell.config.silent = false;

  // set BABEL_ENV to test if undefined
  process.env.BABEL_ENV = process.env.BABEL_ENV || 'test';

  // Grab aliases from webpack config
  const aliases = buildConfigs(config).clientConfig.resolve.alias;

  // Build Jest config
  let jestConfig = jestConfigBuilder(srcPath, aliases);
  jestConfig = config.modifyJestConfig(clone(jestConfig));

  process.env.KYT_ENV_TYPE = 'test';

  // Run Jest
  jest.run(['--config', JSON.stringify(jestConfig), ...flags]);
};
