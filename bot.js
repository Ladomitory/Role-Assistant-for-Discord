const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const bot = new Discord.Client(); // Объявляем, что bot - бот
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

bot.on("ready", function() {
  /* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
  console.log(bot.user.username + " запустился!");
});


bot.on('message', (msg) => { // Реагирование на сообщения
  if (msg.author.username != bot.user.username && msg.author.discriminator != bot.user.discriminator) {
    var comm = msg.content.trim() + " ";
    var comm_name = comm.slice(0, comm.indexOf(" "));
    var messArr = comm.split(" ");
    for (comm_count in comms.comms) {
      var comm2 = prefix + comms.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms.comms[comm_count].out(bot, msg, messArr);
      }
    }
  }
});


bot.login(token); // Авторизация бота