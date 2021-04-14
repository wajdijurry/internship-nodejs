var amqp = require('amqplib/callback_api');

module.exports = {
    send_sync: (queue_name, message, callback) => {
        let result = {};
        amqp.connect('amqp://172.17.0.1', function (error0, connection) {
            if (error0) {
                throw error0;
            }

            connection.createChannel(function(error, channel) {
                if (error) {
                    throw error;
                }
                channel.assertQueue('', {
                    exclusive: true,
                    autoDelete: false,
                }, function(error1, q) {
                    if (error1) {
                        throw error1;
                    }

                    let correlationId = generateUuid();

                    channel.consume(q.queue, function(msg) {
                        if (msg.properties.correlationId == correlationId) {
                            console.log(' [.] Got %s', msg.content.toString());
                            result = JSON.parse(msg.content.toString());
                            callback(result);
                            setTimeout(function() {
                                connection.close();
                            }, 500);
                        }
                    }, {
                        noAck: true
                    });

                    channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(message)), {
                        correlationId: correlationId,
                        replyTo: q.queue
                    });
                });
            });
        });
    }
};

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}