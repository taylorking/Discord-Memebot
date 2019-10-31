const { prefix } = require('../config.json');
//TODO: Try to move these to the config.json at a later date.
const disease = ['ligma', 'sugma', 'wilma', 'chugma', 'gargledeez', 'boufa', 'poppingamer', 'upgamer', 'kizma', 'chokama', 'grabma', 'swallama', 'candis', 'grabahun'];
const disease_prefixes = ['Have you heard of the deadly disease', 'What\'s', 'Did you see Joe with', 'God I\'ve been craving', 'I\'ve been so horny for', 'What do you know about'];

module.exports = {
	name: 'help',
	description: 'List all of the commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	execute(message, args){
		const data = [];
		const { commands } = message.client;
		if (!args.length) {
			//Collect a random ligma line.
			var ligma_prefix = disease_prefixes[Math.floor(Math.random()*disease_prefixes.length)]
			var ligma = disease[Math.floor(Math.random()*disease.length)]
			data.push(`\`\`\``);
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\`\`\``);
			data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command.`);
			data.push(`\n${ligma_prefix} ${ligma}`);
			message.channel.send(data);
		}

		else{
			//clip off command name and search for it and aliases
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
			if (!command) {
				return message.reply('that\'s not a valid command!');
			}

			data.push(`**Name:** ${command.name}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
			message.channel.send(data, { split: true });
		}
	}
}
