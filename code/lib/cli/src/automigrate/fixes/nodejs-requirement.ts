import chalk from 'chalk';
import dedent from 'ts-dedent';
import semver from 'semver';
import { getStorybookInfo } from '@storybook/core-common';
import type { Fix } from '../types';

interface NodeJsRequirementOptions {
  nodeVersion: string;
}

export const nodeJsRequirement: Fix<NodeJsRequirementOptions> = {
  id: 'nodejs-requirement',
  promptOnly: true,

  async check({ packageManager }) {
    const packageJson = packageManager.retrievePackageJson();
    const { version: storybookVersion } = getStorybookInfo(packageJson);

    const storybookCoerced = storybookVersion && semver.coerce(storybookVersion)?.version;
    if (!storybookCoerced) {
      throw new Error(dedent`
        ❌ Unable to determine storybook version.
        🤔 Are you running automigrate from your project directory? Please specify your Storybook config directory with the --config-dir flag.
      `);
    }

    if (!semver.gte(storybookCoerced, '7.0.0')) {
      return null;
    }

    const nodeVersion = process.version;
    if (semver.lt(nodeVersion, '16.0.0')) {
      return { nodeVersion };
    }

    return null;
  },
  prompt({ nodeVersion }) {
    return dedent`
      ${chalk.bold(
        chalk.red('Attention')
      )}: We could not automatically make this change. You'll need to do it manually.

      We've detected that you're using Node ${chalk.bold(
        nodeVersion
      )} but Storybook 7 only supports Node ${chalk.bold(
      'v16.0.0'
    )} and higher. You will either need to upgrade your Node version or keep using an older version of Storybook.

      Please see the migration guide for more information:
      ${chalk.yellow(
        'https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#dropped-support-for-node-15-and-below'
      )}
    `;
  },
};
