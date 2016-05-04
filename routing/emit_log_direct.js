const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		const ex = 'direct_logs';
		const args = process.argv.slice(2);
		const msg = args.slice(1).join(' ') || 'Forgot text, Stupid!';
		const severity = (args.length > 0) ? args[0] : 'info';

		ch.assertExchange(ex, 'direct', {durable: false});
		ch.publish(ex, severity, new Buffer(msg));
		console.log(' [x] Sent %s', severity, msg);
	});

	setTimeout(() => { conn.close(); process.exit(0); }, 500);
});
