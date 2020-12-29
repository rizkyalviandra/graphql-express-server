const graphql = require("graphql");
const Book = require("../models/books");
const Author = require("../models/author");
const Publisher = require("../models/publisher");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

const fakeBookList = [
  { name: "pemrograman adruino & android", publisher: "Malang Booklet", id: 1 },
  { name: "pemrograman ReactJS", publisher: "React.id", id: 2 },
  { name: "pemrograman javascript", publisher: "MalangJS", id: 3 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    publisher: {
      type: PublisherType,
      resolve(parent, args) {
        return Publisher.findById(parent.publisherID);
      },
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorID);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const PublisherType = new GraphQLObjectType({
  name: "Publisher",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({ authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
    publisher: {
      type: PublisherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Publisher.findById(args.id);
      },
    },
    publishers: {
      type: new GraphQLList(PublisherType),
      resolve(parent, args) {
        return Publisher.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        publisherID: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          publisherID: args.publisherID,
          authorID: args.authorID,
        });
        return book.save();
      },
    },
    addPublisher: {
      type: PublisherType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let publisher = new Publisher({
          name: args.name,
          address: args.address,
          authorID: args.authorID,
        });
        return publisher.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
