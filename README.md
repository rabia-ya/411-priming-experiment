# Ling 411 Experiment - Fall 2020

This repo contains the Lexical Decision Task with Priming experiment on IbexFarm prepared with the Ling 411 (Fall 2020) students. Student prepared the experimental and filler items on Google Drive. The XLSX file can be found under itemGeneration folder.

This repo also contains the item generation script written in R and custom css and js files.

The experiment is live and can be found [following this link](1).

## Workflow

This part contains information regarding deploying a copy of this experiment in your own IbexFarm account.

1. Fork this repo.
2. Change the Priming.xlsx if you want to use a different set of items.
3. Run item_generate.R inside the itemGeneration folder.
4. Edit the html files in chunk_includes according to your needs.
5. Push your changes to your own fork.
6. Create an IbexFarm account and IbexFarm experiment. (Reload the page after clicking "Create")
7. Click on the name of your new experiment. Then, click on "update from git repo" button. Two text boxes will show up.
8. Find the link of your repo (something like "https://github.com/YOURUSERNAME/411-priming-experiment") and copy it to the repo url text box in the IbexFarm page. Then click "Sync."
9. Delete the unneccessary files named example_intro.html, test1.mp3, test2.mp3, example_data.js

[1]: https://spellout.net/ibexexps/411/priming/experiment.html
