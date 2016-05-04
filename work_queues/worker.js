const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'hillo';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [x] Waiting for messages in %s. To exit press CTRL+C", q);

    ch.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
      const secs = msg.content.toString().split('.').length - 1;
      setTimeout(() => {
      	console.log('[x] Done');
      	ch.ack(msg);
      }, secs * 1000);
    }, {noAck: false});
  });
});
