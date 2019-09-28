This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Deployment for this project is being managed by Heroku.

The project can be view live [here](https://comp482-asg3-bcochrane.herokuapp.com/).

Below you will find some information on how to run the application

## Table of Contents

- [View the live version](#View-the-live-version-of-the-application)
- [How to run the application locally](#How-to-run-the-application-locally)
- [Getting the files](#Getting-the-files)
- [Install and verify you have npm](#Install-and-verify-you-have-npm)
- [Update the dependencies](#Update-the-dependencies)

## View the live version of the application

[https://comp482-asg3-bcochrane.herokuapp.com](https://comp482-asg3-bcochrane.herokuapp.com) 

This is not a production build and is hosted on a free dyno from heroku. What this means is the application could take some time to start up as heroku may need to turn on the dynos for the application, which can take a couple minutes. After the Dynos have been turned on, the application will run properly. 

Dynos turn off after 30 minutes of inactivity and will be turned on automatically when the URL is requested. If you get an error at the URL reload the page.

## How to run the application locally

Due to the dependencies, the git repo is quite large. 155 MB

You can either download and unzip the project from the url below or use git clone

### Getting the files

You can get the files in multiple ways. Option 2,3,4a include the dependencies, option 1 and 4b do not. However; all options still require you to have npm installed and require the command npm update to be run before the project will build correctly.

1. Using the zip attached to the submission
    1. This does not include node_modules due to file size
    2. You will need to run *npm update* against the project to download the dependencies (see update the dependencies section)
2. Use Git clone 
    1. This requires git to be installed on your computer
    2. This includes dependencies (155 MB)
    3. *git clone https://github.com/bcochrane11/comp482_asg3.git*
3. Download the zipped application from Google Drive
    1. With dependencies (155 MB): [https://drive.google.com/file/d/1Ky2SdEYL0_gPOwntVgMVv36najj9WD2g/view?usp=sharing ](https://drive.google.com/file/d/1Ky2SdEYL0_gPOwntVgMVv36najj9WD2g/view?usp=sharing)
    2. Without dependencies (4 MB) [https://drive.google.com/open?id=14dW_bOfyUyVprruTwzmY76sza1f7OFpq] 
    3. This is the zip submitted
4. Download the zipped application from github
    1. THIS METHOD IS NOT RECOMMENDED
    2. Includes dependencies (155 MB): [https://github.com/bcochrane11/comp482_asg3](https://github.com/bcochrane11/comp482_asg3) 

### Install and verify you have npm
1. Open command prompt
2. Check if npm is installed by running the command: npm -v
3. If you have npm installed you will see number similar to “5.6.0” 
    1. Depending on your installed version the number may be different
    2. The application was developed using 5.6.0, so anything above that should work
4. If you don’t have npm installed, download and install it from this url https://nodejs.org/en/
    1. Once installed, restart your computer
    2. Once your computer restarts try step 2 again
    3. Follow this guide if you get stuck https://blog.teamtreehouse.com/install-node-js-npm-windows
5. Once you have verified npm is installed with npm -v, use the command line to cd into the project folder
    1. You can also use the windows explorer by navigating to the project then pressing ctrl + right click and select “open PowerShell window here”

### Update the dependencies 

**required for all projects**

1. Once in the project folder type npm update into the command line and hit enter
    1. Without this command you will get errors on step 8
    2. Depending on how you decided to get the project files this may take some time
    3. There will be vulnerabilities (these don’t affect the assignment)
2. Not that you have updated npm type npm start into the command line
3. Once the package builds the project will run
    1. Depending on system settings a browser window may open automatically
    2. If a browser doesn’t open automatically open on and navigate to http://localhost:3000 


## Logging into the application

1. There are two buttons on the login screen for test users. Select one to log into the system.
2. If you select the login button you will get an error message and will not be logged in
3. If you select one of the test users the same message will appear but you will be redirected into the application. This is due to the way the login system works. In order to bypass it without input authentication is required to fail first. This feature was added to make it easier for demos and assignment marking
