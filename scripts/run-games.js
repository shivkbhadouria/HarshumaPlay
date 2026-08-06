import { execSync } from 'child_process';
import prompts from 'prompts';

async function main() {
  console.log('📦 Triggering global monorepo build...');
  try {
    // Run the build across all workspaces synchronously
    execSync('pnpm -r build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed. Aborting runtime wizard.');
    process.exit(1);
  }

  // Interactive CLI Selection Menu
  const response = await prompts({
    type: 'select',
    name: 'action',
    message: 'Which platform profile would you like to run?',
    choices: [
      { title: '🎮 Run Everything (Host Dashboard + All Games Parallel)', value: 'all' },
      { title: '🖥️  Run Host Dashboard Only (Port 5000)', value: 'host' },
      { title: '❌ Exit Wizard', value: 'exit' }
    ],
    initial: 0
  });

  if (response.action === 'all') {
    console.log('\n🚀 Starting Host Dashboard and Games concurrently...');
    execSync('pnpm --filter host-dashboard preview & pnpm --filter game-tictactoe preview', { stdio: 'inherit' });
  } else if (response.action === 'host') {
    console.log('\n🖥️ Starting Host Dashboard Preview...');
    execSync('pnpm --filter host-dashboard preview', { stdio: 'inherit' });
  } else {
    console.log('Exiting wizard.');
    process.exit(0);
  }
}

main();
