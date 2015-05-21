const Hapi = require('hapi');
const Good = require('good');
const Path = require('path');
//const persistence = require('./persistence');

const server = new Hapi.Server();
server.connection({port: 8080});

server.views({
    engines: {
        hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    partialsPath: './views/partials'
});
server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        const greeting = request.query.greeting;
        reply.view('index', {greeting});
        //if (greeting) {
            //persistence.save(greeting, (err, greetingObj) => {
            //    const id = greetingObj._id;
            //    // TODO: make this flexible
            //    const link = `http://localhost:8080/send?id=${id}`;
            //    reply.view('index', {link, greeting});
            //});
        //} else {
        //    reply.view('index');
        //}
    }
});

//server.route({
//    method: 'GET',
//    path: '/send',
//    handler: (request, reply) => {
//        const id = request.query.id;
//        if (id) {
//            persistence.load(id, (err, greetingObjs) => {
//                if (greetingObjs && greetingObjs.length) {
//                    const greetingObj = greetingObjs[0];
//                    const greeting = greetingObj.greeting;
//                    reply.view('delivery', {greeting});
//                }
//            });
//        }
//    }
//});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, err => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => server.log('info', 'Server running at: ' + server.info.uri));
});
