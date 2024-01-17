# Learning NestJS
These are small projects, that I made from Youtube videos and Udemy courses.

Project №7 is the largest and I got stuck on database migrations there, because TypeOrm changed the way configs are defined. So I can't figure out how to properly set environment variables and data securely for both CLI tool and NestJS in one place.

To generate a migration:
npm run typeorm migration:generate ./migrations/initialschema -- -d ./typeorm-datasource.ts