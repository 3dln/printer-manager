# A Node.js project which handles orders of a restaurant and sends bills to different printers

## Steps to run this project

### dev

- database
  - docker run -itd -p 5432:5432 -e POSTGRES_PASSWORD=root -e POSTGRES_USER=postgres -e POSTGRES_DB=cafe_db postgres
- app
  - npm run dev

### production

- Install docker for windows
- clone this repo
- cd into cloned directory
- git submodule update --init --recursive
- docker-compose up -d

## TODO

- [x] Setup server with typescript and typeorm
- [x] Setup postgres
- [x] Setup docker and compose for orchestration
- [x] All interfaces
- [x] User model
- [ ] All routes
  - [x] Login
  - [x] get data
  - [ ] submit
  - [ ] autocomplete
    - [ ] prevent entering farsi chars
- [x] Error management
- [ ] Logger
  - [x] api logger (morgan)
  - [ ] main logger (winston)
- [x] middlewares
- [x] validation
- [x] Category model
- [x] product model
- [ ] Cart model
- [ ] Order model
- [x] Login
- [x] Get Printers
- [ ] Define Printers
- [x] Next.js
- [x] Fonts
- [x] RTL
- [ ] Single source of truth architecture for offline mode
  - [ ] Save received info from server into client db
  - [ ] Client db is our single source of truth
  - [ ] Client db needs to get synced with server's db periodically
  - [ ] Check for internet connection availability
  - [ ] Sync menu items and customer data
    - [ ] When internet becomes available
    - [ ] On a regular basis (like every hour)
  - [ ] Error Handling
    - [ ] Server access is not available
    - [ ] Client db is not accessible
    - [ ] Syncing errors
