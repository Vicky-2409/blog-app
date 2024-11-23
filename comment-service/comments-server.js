const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'comments.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const commentProto = grpc.loadPackageDefinition(packageDefinition).comment;

const comments = {
    "1": [
        { id: "c1", content: "Great post!", author: "Alice" },
        { id: "c2", content: "Very informative.", author: "Bob" },
    ],
    "2": [
        { id: "c3", content: "I learned a lot.", author: "Charlie" },
    ],
};

const getComments = (call, callback) => {
    const commentsForBlog = comments[call.request.blog_id];
    if (commentsForBlog) {
        callback(null, { comments: commentsForBlog });
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Comments not found",
        });
    }
};

const server = new grpc.Server();
server.addService(commentProto.CommentService.service, { GetComments: getComments });

const port = '50052';
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Comments service running at http://localhost:${port}`);
    server.start();
});
