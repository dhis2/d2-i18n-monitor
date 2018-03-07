## Contribution
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
