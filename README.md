# loundr
### Money transactions made easy

<img src="/assets/splash.png" width=250 align=left >

## Usage

### Downloading Homebrew
To start with I would really recommend downloading 
[Homebrew](https://brew.sh/) if you do not have it already; it will make it easier to go through the installation process.

### Downloading Node and npm
You will definitely need to install Node which also goes with npm (node package manager). Make sure to install the **Current Version** with the **Latest Features** over here - 
[Download Node](https://nodejs.org/en/).


### Downloading Expo
Next, download **expo-cli**:

```bash
npm install -g expo-cli
```
Verify if the installation was successful by
```bash
expo whoami
```
You should get:
> "Not logged in"

If you are using Mac, you should also [install Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) - you can use Homebrew for that.

Visit the official [Expo docs](https://docs.expo.io/get-started/installation/) for get info on how to set up simulators
(Note: you cannot use an iOS simulator if you are not using a Mac; nevertheless, I have heard there are ways one could do it)

### Running the program
If you fork the repo and then pull it you can go into the project folder and
```bash
expo start
```
or
```bash
npm start
```
to start your app. You will also see the terminal, giving your further instructions on how to run the app on the emulators.


## Contributors
The following developers helped this idea become a reality:

<img src="https://avatars2.githubusercontent.com/u/34740725?s=400&u=15efe798db9cf249e596e47f2591dcadda0e6ec0&v=4" width="100" height="100">
<img src="https://avatars1.githubusercontent.com/u/29056703?s=460&u=c2932f32a8c593d5db91ab1ca6dac3967d226078&v=4" width="100" height="100">

## Collab
If this is the first time working on the project:
```bash
git clone https://github.com/IQ01660/loundr.git
```

Otherwise,
If you haven't created any branches yet,
make sure to pull from the master branch:
```bash
cd loundr
```
and

```bash
git pull origin master
```

*** At this point make sure you do not make any changes to any files in the project folder on your local computer. ***

Then create a new branch with the following naming convention:
> [screen name/component/file]-[the aspect you wanna change if not the whole file]-[any unique ids if needed]

Make sure that the branch name you are planning to create doesn't exist already.
You can do this by clicking Branch: master (e.g.) and then clicking **View all branches** and
then search for the one you want to create.

Now you can create a new branch with:
```bash
git branch your-branch
git checkout your-branch
```
and then switch to it.

Now you can do all the neede changes before doing the standard

```bash
git status
git add .
git commit -m "changed [file names] [maybe some aspects of it] and created [file names] / added some component in [file name]"
```

before pushing the changes to repo make sure you have the origin set up:
```
git remote -v
```

Then do
```bash
git push origin your-branch
```
*** It is important to nut push anything to master at this point ***

After this I will go and merge your-branch with master if needed
through GitHub's pull request and then delete your-branch remotely. 
Once this is done and all conflicts are resolved
you can go ahead and 

```bash
git pull origin master
```

and then delete your local branch
```bash
git branch -d your-branch
```

If you already want to work on a specific branch that already exists remotely,
then you should make sure to first ***create that branch locally (with the same name)***
and then you can ***checkout that branch*** and do
```bash
git pull origin some-branch
```






