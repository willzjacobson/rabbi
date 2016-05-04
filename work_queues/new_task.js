const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const q = 'hillo';
    const msg = process.argv.slice(2).join(' ') || 'You Forgot Text, Stupid!';

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(() => { conn.close(); process.exit(0); }, 500);
});
