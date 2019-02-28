## Purpose

[![Greenkeeper badge](https://badges.greenkeeper.io/dhis2/d2-i18n-monitor.svg)](https://greenkeeper.io/)

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

Any additionally language support can be added by adding topic **lang-LANGUAGE-CODE** to a repo. For example. adding support for **Urdu** language is as simple as attaching **lang-ur** topic to repo. Target language files for example _ur.po_ might not be present, but this can easily be managed using this **d2-i18n-monitor**. More on this under **Contribution** below.

### Contribution
Any repo. with internationalization support will be a _blue_ link. Click on the link to go to the project page.

Here you will see a bunch of files. Apart from file contents, the valuable information is content analysis which are presented in a table above contents.

**Note**
All file contents used below are taken from the **master** branch.

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

#### LANGUAGE-CODE.po
Replace **LANGUAGE-CODE** with your language. In this section I will use language **Urdu** represented by code **ur** as an example to elaborate the workflow.

Assuming _lang-ur_ langauge has been attached to the repo. Project page will show **ur.po** file. Presence of **ur.po** inside target repo is not necessary. If present contents of **ur.po** will appear under.

Under **ur.po** you will see,
- **Total** Reperesenting the total number of _msgid_ strings present in _en.pot_ file. Because _en.pot_ is the standard file we compare all our translations against.
- **Translated** Number of strings that have been translated into _Urdu_.
- **Health** Detect health _Urdu_ language for this project repo.

### Edit Mode
You can click on the **Pencil Icon** on the very left of files. This will help you edit any _LANGUAGE-CODE.po_ file. As an example if we are on _ur.po_ file. This page will show strings in _English_ on the left side with strings in _Urdu_ on the right side.

If you editing a translation for string *Delete* and your cursor is inside the edit text on the right. A bunch of translation suggestions will appear. You can click on any one to replace existing translation for *Delete*.

Once you are finished translating, hit **Save** at the bottom of the page.

- We will create a branch inside the project repo. by the name **i18n/LANGUAGE-CODE-translations**.
- We will push all updated language strings in **LANGUAGE-CODE.po** to the same path as on **master** branch.

At this point you must create a **Pull Request** from **i18n/LANGUAGE-CODE-translations** against the **master** branch to merge updates. 


**Note**

When your **Pull Request** is merged with the master branch. Please delete **i18n/LANGUAGE-CODE-translations** branch.
