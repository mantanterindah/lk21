const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const bot = new Discord.Client();
const URL = "http://lk21.pw"

bot.on('ready', (message) => {
	
	setInterval(() => {
		request(URL, function(err, resp, body) {
		if (err) {
		console.log(err)
		}

		let $ = cheerio.load(body);

		var info = $('div.container > div.site-content > main > div > section > div.grid.row > div:nth-child(1)').children();
		var judul = info.find('h2 a').text();
		var rating = info.find('div.movie-meta').children().eq(0).text();
		var quality = info.find('div.movie-meta').children().eq(1).text();
		var duration = info.find('div.movie-meta').children().eq(2).text();
		var url2 = info.find('div.thumbnail').find('a').attr('href');
		var img = info.find('div.thumbnail').find('a').children().attr('src');
		var pureimg = 'http:'+img;
		var genre = info.find('span.cat-links').text();
		var trailer = info.find('footer.more').find('a').attr('href')
		console.log(judul)
		console.log(rating+' '+'Quality'+' '+quality+' '+'Duration'+' '+duration)
		console.log(img)
		console.log(genre)
		console.log(trailer)
		
		request(url2, function(err, resp, body) {
			if (err) {
				console.log(err)
			}

			let $ = cheerio.load(body);

			var keterangan = $('div.entry-content > div > div.col-md-12 > table > tbody').children();
			var actor = keterangan.eq(1).text();
			var director = keterangan.eq(2).text();
			var release = keterangan.eq(6).text();
			var synopsis = $('#movie-synopsis > div > p').text();

			console.log(actor)
			console.log(director)
			console.log(release)
			console.log(synopsis)

			let embed = new Discord.RichEmbed()
			.setColor("#f44277")
			.setTitle(judul)
			.setImage(pureimg)
			.addField('Rate', rating, true)
			.addField('Quality', quality, true)
			.addField('Duration', duration, true)
			.addField('Genre or Tag', genre, true)
			.addField('More Information', actor+'\n'+director+'\n'+release)
			.addField('Link to Watch or Download', url2)
			.addField('Trailer on Youtube', trailer)
			.setFooter(synopsis);

			const id ="375383058590859276" //channel to send
			const channel = bot.channels.get(id);
			channel.send(embed);

		})


		

		})
	}, 10000)
});
process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Error: \n${error.stack}`);
});

bot.login(process.env.BOT_TOKEN);
