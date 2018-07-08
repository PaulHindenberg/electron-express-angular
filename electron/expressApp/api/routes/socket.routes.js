
module.exports = function (app, io) {

    app.get('/socket/test', function (req, res) {
        io.emit('message', { type: 'new-message', text: 'Hello from Socket.io' });
        res.send('api tested');
    });

};
