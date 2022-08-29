import { Command, CommandFactory } from 'nest-commander';

@Command({ name: 'test', description: 'A parameter parse' })
export class TestCommand {
	async run() {
		console.log('Hello');
	}
}

(async () => {
	await CommandFactory.run(TestCommand);
})()
