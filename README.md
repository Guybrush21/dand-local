# DanD

DanD is an agnostic tool for dungeon masters, it help dungeon master in organizing their sessions and their world building. DanD is inspired by the Lazy Dungeon Master guide.

DanD manages your characters, locations and items, you can create your own or let it randomly generate. You can also record some log message where something interesting happen during your session or when you are preparing your sessions.

## Feature

- [x] Character
- [x] Location
- [x] Items
- [ ] Diary Logs
- [ ] Quests and hooks
- [ ] Attachments
- [ ] Sessions
- [ ] Tag system
- [ ] Multi campaign
- [ ] Fancy Map organizer

## Technology

DanD is entirely developed in Angular, it saves informations in the browser with PouchDB and sync with a CouchDB instance with a database-per-user pattern. UI components are from PrimeNG. Authentication is using Firebase (for now).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
