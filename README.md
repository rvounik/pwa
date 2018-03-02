# pwa
Proof of concept for Psybizz/LTP PWA for questionnaires

- run npm install to initialise the project
- run grunt to transpile js and copy JS, CSS and static assets to web and trigger the watcher task
- add a directive in etc/hosts for www.rvo-pwa.nl to 127.0.0.1
- manually copy the ssl/cert.crt to your certificate keychain, then set it to always accept
- build a new docker container: docker build -t pwa .
- run the container: docker run -d -p 80:80 -p 443:443 --name pwa-container pwa
- visit https://www.rvo-pwa.nl in your browser
- you can use something like browser-sync to be able to access your local project on a mobile device

rvo, 2017
