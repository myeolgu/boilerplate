import stylelint from 'stylelint';
import fs from 'fs';
import path from 'path';

import {
  __dirname,
  projectDirName,
  isBuild,
  destFolder,
  srcFolder,
  projectPaths,
  projectReplacePaths,
} from './paths.js';

const createRule = (ruleName, message, checkProp, checkValue, targetProp) => {
  const messages = stylelint.utils.ruleMessages(ruleName, { expected: message });

  return stylelint.createPlugin(ruleName, function (enabled) {
    return (root, result) => {
      if (!enabled) return;
      root.walkDecls(checkProp, (decl) => {
        if (decl.value === checkValue) {
          decl.parent.walkDecls(new RegExp(targetProp), (declChild) => {
            stylelint.utils.report({
              message: messages.expected,
              node: declChild,
              result,
              ruleName,
            });
          });
        }
      });
    };
  });
};

const rulesConfigPath = path.resolve(__dirname, 'stylelintRulesConfig.json');
const rulesConfig = JSON.parse(fs.readFileSync(rulesConfigPath, 'utf8'));

const rules = rulesConfig.map((config) =>
  createRule(
    config.ruleName,
    config.message,
    config.checkProp,
    config.checkValue,
    config.targetProp
  )
);

export default rules;
