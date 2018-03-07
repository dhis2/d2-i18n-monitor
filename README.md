## Purpose
We use [d2-i18n-monitor](http://dhis2.github.io/d2-i18n-monitor/) to track progress of language support across our entire DHIS2 platform (only frontend for now).

### Configuration
You need a _Personal access token_ to use this monitoring service.

- [Open this link](https://github.com/settings/tokens).
- Click on *Generate new token* button
- Enter some meaningful name in *Token description*. Assign all permissions under *repo* category to this token
- Go to the bottom of the webpage. Hit *Generate token*

Copy this token into _Access Token_ present on the _Config_ page. Hit *Save*.

**Note**
- By default you will only monitor repos in GitHub Organization **dhis**. If your translation repo belongs to another organization then enter it inside *Organizations* field on a separate line.
- You can skip individual repos. Enter them under _Skip these repos field_ e.g. *dhis2/repo-no-monitoring*

### Listing
Once configured you will see all repos with postfix **-app** under page **Projects**


### Detection
Repos. where [d2-i18n](https://github.com/dhis2/d2-i18n) support has been implemented. You should attach a GitHub topic **d2-i18n** to that repo. Additionally attach **lang-en** as English is our default language.

Any additionally language support can be added by adding topic **lang-LANGCODE** to a repo. For example. adding support for **Urdu** language is as simple as attaching **lang-ur** topic to repo. Target language files for example _ur.po_ might not be present, but this can easily be managed using this **d2-i18n-monitor**. More on this under **Contribution** below.

### Contribution
Any repo. with internationalization support will be a _blue_ link. Click on the link to go to the project page.

Here you will see a bunch of files. Apart from file contents, the valuable information is analysis on the contents which are presented in a statistics table above contents.

#### package.json
If [d2-i18n](https://github.com/dhis2/d2-i18n) support has been implemented we detect the presence of the following scripts.

- extract-pot: To extract contents out of source code to create _en.pot_ file.
- localize: Use _pot_ and _po_ files to generate _i18next_ compatible _json_ files.
- prettify: If code prettification is implemented or not. Not necessary in anyway but important to standardize our entire 30. repo's with countless lines to look the same.
- build: Detect if build step has been present.

#### en.pot
All the translatable language strings part of _source code_ are present in en.pot file. This file is generated automatically on **dev** and **build**

Above file contents you can see the number of *msgid* strings that need to be translated.

#### .travis.yml
We only detect the presence of *yarn lint* nd *yarn build* step be part of _.travis.yml_ file.

