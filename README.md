# FrontendExercise

This repository consists of my notes and exercises in my Web Development Bootcamp course on Udemy.

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
sudo n stable
npm --version
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
Then, in order to implement minimal local dependencies for saving disk space, type
```bash
rm -rf node_modules && yarn link jquery
```
Then declare this at the beginning your local .js file
```javascript
const $ = require('jquery');
```
However, a default browser doesn't define <code>require</code>, so it's necessary to add [RequireJS](https://requirejs.org/) as a plugin.
