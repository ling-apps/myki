# Myki

Myki is a brand new wiki engine.

The Myki objective is to provide a beautiful and simple way to write and read
notes, we also want it to be offline capable.

We designed it to store data localy (via indexedDb), but we're also planning to
add a connector for a myki-backend to allow you to store your data in the
cloud.

You can see a demo of the current Myki version here:
[http://demo.myki.ling.fr](http://demo.myki.ling.fr)

## Installation

### On your own computer

    git clone http://github.com/b2l/myki
    cd myki
    node bin/server.js

Job done, just go to [http://localhost:3000](http://localhost:3000)

### In the cloud

simply checkout the Myki sources and deploy on heroku ( a procfile is already provided)

    git clone http://github.com/b2l/myki
    cd myki
    git remove add heroku YOUR-HEROKU-GIT-URL-HERE
    git push heroku


We're currently exploring solution to "really" install it locally, the fact that it needs a node.js server is pretty frustrating as it's just a simple html file (advice very welcome !)

## Browser support

Currently, the writing / reading part work on both FF and Chrome (IE not tested).

The document library part is currently not woking on chrome, due to a bug with FileReader API.

## Contributor

Contributors are very welcome as we're working on the project during our free time. Simply add a pull request.

Myki is currently developped by :

* [Blandine Descamps](https://github.com/blandine)
* [Nicolas MEDDA](https://github.com/b2l)
