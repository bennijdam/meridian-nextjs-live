import { spawnSync } from 'node:child_process';
import path from 'node:path';

function getEslintBin() {
  // On Windows the npm shim is eslint.cmd; on *nix it's eslint.
  const binName = process.platform === 'win32' ? 'eslint.cmd' : 'eslint';
  return path.join(process.cwd(), 'node_modules', '.bin', binName);
}

const eslintBin = getEslintBin();

const env = { ...process.env };
// Ensure ESLint v9 uses flat config (eslint.config.mjs).
// Some shells may have ESLINT_USE_FLAT_CONFIG=false set from past debugging.
delete env.ESLINT_USE_FLAT_CONFIG;

// On Windows, spawning a .cmd shim requires shell=true.
const useShell = process.platform === 'win32';

const result = spawnSync(eslintBin, ['.'], {
  stdio: 'inherit',
  env,
  shell: useShell,
});

process.exit(result.status ?? 1);
