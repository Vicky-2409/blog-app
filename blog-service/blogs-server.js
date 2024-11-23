const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'blogs.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const blogProto = grpc.loadPackageDefinition(packageDefinition).blog;

const blogs = {
    "1": { id: "1", title: "First Blog", content: "This is the first blog.", author: "John Doe" },
    "2": { id: "2", title: "Second Blog", content: "This is the second blog.", author: "Jane Doe" },
};

const getBlog = (call, callback) => {
    const blog = blogs[call.request.blog_id];
    if (blog) {
        callback(null, blog);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Blog not found",
        });
    }
};

const server = new grpc.Server();
server.addService(blogProto.BlogService.service, { GetBlog: getBlog });

const port = '50051';
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Blog service running at http://localhost:${port}`);
    server.start();
});
