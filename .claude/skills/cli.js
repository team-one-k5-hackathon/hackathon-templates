#!/usr/bin/env node
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function addSkill(...args) {
  console.log(`> npx skills add ${args.join(' ')}`);
  execFileSync('npx', ['skills', 'add', ...args], { stdio: 'inherit' });
}

function installSkills(skillsFile) {
  const resolved = path.resolve(skillsFile);

  if (!fs.existsSync(resolved)) {
    console.error(`Error: ${skillsFile} not found`);
    process.exit(1);
  }

  const { agent, collections = [], skills = {} } = JSON.parse(fs.readFileSync(resolved, 'utf8'));

  console.log(`Installing skills for agent: ${agent}\n`);

  for (const repo of collections) {
    addSkill(repo, '--agent', agent, '--yes');
  }

  for (const [name, repo] of Object.entries(skills)) {
    addSkill(repo, '--skill', name, '--agent', agent, '--yes');
  }
}

function updateGitignore() {
  const lockFile = path.resolve('skills-lock.json');
  if (!fs.existsSync(lockFile)) return;

  const lock = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
  const dirs = Object.keys(lock.skills || {}).map(s => s);

  const MARKER = '# ######################################';
  const block = [MARKER, '# npx skills - DO NOT EDIT', ...dirs, MARKER].join('\n');

  const gitignorePath = path.resolve('.claude/skills/.gitignore');
  const existing = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';

  const blockRe = /# #{38}\n# npx skills - DO NOT EDIT\n[\s\S]*?# #{38}/;
  const updated = blockRe.test(existing)
    ? existing.replace(blockRe, block)
    : existing ? `${existing.trimEnd()}\n\n${block}\n` : `${block}\n`;

  fs.writeFileSync(gitignorePath, updated);
  console.log(`Updated .claude/skills/.gitignore with ${dirs.length} skill(s)`);
}

// Execution
const skillsFile = process.argv[2] || 'skills.json';
installSkills(skillsFile);
updateGitignore();

console.log('Done.');
