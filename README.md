## Purpose
We use *d2-i18n-monitor* to track progress of language support across our entire DHIS2 platform (only frontend for now). Open 
[d2-i18n-monitor](dhis2.github.io/d2-i18n-monitor/).

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
