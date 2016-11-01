# mean-sample
my take on the example from Jeff Dickey's book

very much work in progress...
Building on the chapter 8 version from the book:
- added user registration (pg. 119)
- added logout (pg. 120)
- foreign key for user (pg. 122)
- comments for posts (new)
- up-/downvotes for comments (new)
- links (new)
- prepared for file uploads (new)

to run:
- $ mongod &
- $ gulp js
- $ node server.js

mongoDB basics:
- enter mongodb: $ mongo
- list DBs: > show dbs
- use DB: > use [db]
- list collections: > db.getCollectionNames() or >show collections
- remove docs in collection: > db.[collection].remove()
- remove db: > db.dropDatabase()
