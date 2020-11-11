# FrontendExercise

This repository consists of my notes and exercises in my Web Development courses on Udemy.

## Links

-   [resources](https://www.appbrewery.co/p/web-development-course-resources/)

### Localize the repository

```bash
mkdir -p ~/udemy/WebCamp/
cd ~/udemy/WebCamp/
git clone git@github.com:Orthologues/WebProgrammingExer.git
# OR "git remote set-url origin git@github.com:username/repo.git" if url needs to be changed
```

### Perform git push without password

```bash
ssh-keygen -t rsa -C "your_email@example.com" # all default, no passphrase
```

Then copy the text in your `~/.ssh/id_rsa.pub` to create a ssh-key in your github settings.

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git push -u origin master
```

### Perform ssh login without password

```bash
ssh-keygen # all default, no passphrase
ssh-copy-id -i ~/.ssh/id_rsa.pub UserName@RemoteServer # type password at the remote server
```

Now try logging into the machine, with <code>ssh username@remoteserver</code>, and check in:
<code>~/.ssh/authorized_keys</code> to make sure we haven't added extra keys that you weren't expecting.

```bash
ssh-add # run this command locally
```

### Install node.js, npm, yarn and packages

```bash
brew install node # in MacOS
sudo apt install -y npm # in Linux
sudo npm install -g yarn -g n
sudo n stable # or 'sudo n latest'
npm --version; node --version # 12.x for stable, 14.x for latest
```

Change config of yarn to install packages without sudo later

```bash
mkdir -p ~/.yarn_global
yarn config set prefix ~/.yarn_global
yarnBin=$(yarn global bin)
addrc=$(echo "PATH+=\":${yarnBin}\"")
echo $addrc >> ~/.zshrc && unset addrc # in MacOS, >> .bash_profile if bash is used in terminal
echo $addrc >> ~/.bashrc && unset addrc # in Linux
```

Now install packages as you wish!

```bash
yarn global add typescript
yarn global add @vue/cli  # etc
```

What if a yarn pkg doesn't have a binary to execute? Use <code>yarn link</code> instead. Let's take jquery as an example.
```bash
yarn global add jquery &&
cd ~; jq_itg=$(find -name "jquery"|grep -E '.+yarn.+');
cd $jq_itg; yarn link; unset jq_itg;
cd ~/my/web/project/;
yarn init; #configure package.json at Terminal
```
then type
```bash
yarn add jquery &&
```
in order to add jquery as a dependency into <code>package.json</code> of your local project.
Then, in order to avoid storing dependency files locally for saving disk space, type
```bash
rm -rf node_modules && yarn link jquery
```
Use <code>npm ci</code> to add implicit dependencies to your local <code>node_modules</code>,
then declare this at the beginning of your local .js file
```javascript
const $ = require('jquery');
```
However, a default browser doesn't define <code>require</code>, so it's necessary to add [RequireJS](https://requirejs.org/) as a plugin.

#### Use ES6 "import" syntax instead of node.js "require" syntax to import modules
add
```json
"type": "module",
```
at the top of local <code>package.json</code>, or simply use <code>.mjs</code> suffix for your javascript file.

#### solve the <code>'__dirname' is not defined</code> issue in ES6 syntax, use import.meta
```javascript
import path from 'path';
console.log(JSON.stringify(import.meta));
const moduleURL = new URL(import.meta.url);
console.log(`pathname ${moduleURL.pathname}`);
console.log(`dirname ${path.dirname(moduleURL.pathname)}`);
const __dirname = path.dirname(moduleURL.pathname);
console.log(__dirname);
```

### Set up a typescript project

```bash
mkdir -p my_ts_project && cd my_ts_project
npm init -y && tsc --init
```

add <code>"build": "tsc"</code> in section <code>"scripts": </code> in <code>package.json</code>, then run

```bash
npm run build
```

to automatically compile typescript files into javascript files
