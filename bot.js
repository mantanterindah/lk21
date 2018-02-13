const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const bot = new Discord.Client();
const url = "http://lk21.pw/latest/"

bot.on('ready', (message) => {
	setInterval(() => {
		request(url, function(err, resp, body) {
		if (err) {
		console.log(err)
		}

		let $ = cheerio.load(body);

		var info = $('div.container > div.site-content > main > div > section > div.grid.row > div:nth-child(1)').children();
		var judul = info.find('h2 a').text();
		var rating = info.find('div.movie-meta').children().eq(0).text();
		var quality = info.find('div.movie-meta').children().eq(1).text();
		var duration = info.find('div.movie-meta').children().eq(2).text();
		var url = info.find('div.thumbnail').find('a').attr('href');
		var img = info.find('div.thumbnail').find('a').children().attr('src');
		var genre = info.find('span.cat-links').text();
		var trailer = info.find('footer.more').find('a').attr('href')
		console.log(judul)
		console.log(rating+' '+'Quality'+' '+quality+' '+'Duration'+' '+duration)
		console.log(url+'\n'+img)
		console.log(genre)
		console.log(trailer)

		let embed = new Discord.RichEmbed()
			.setColor("#f44277")
			.setTitle(judul)
			.setImage(img)
			.addField('Rate', rating)
			.addField('Quality', quality)
			.addField('Duration', duration)
			.addField('Genre or Tag', genre)
			.addField('Link to Watch or Download', url)
			.addField('Trailer on Youtube', trailer);

			const id ="406756127410225172" //channel to send
			const channel = bot.channels.get(id);
			channel.send(embed);

		})
	}, 2700000)
});

process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Error: \n${error.stack}`);
});

//bot will send data every 45 minutes
bot.login(process.env.BOT_TOKEN);
