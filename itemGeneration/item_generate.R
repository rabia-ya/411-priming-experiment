#setwd active document
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

#packages
library(magrittr)
library(janitor)
library(googledrive)
library(readxl)
library(tidyr)
library(tidyverse)

#read file
drive_download("Priming", type = "xlsx")
stimFile <- "Priming.xlsx"
experimental <- read_excel(stimFile, sheet = 1)
filler <- read_excel(stimFile, sheet = 2)

#clean
experimental %<>% select(1:4) 
names(experimental)[3] <- "prime_related"
names(experimental)[4] <- "prime_unrelated"

filler %<>% select(1:3) 
names(filler)[2] <- "target"
names(filler)[3] <- "prime"

# prepare conditions
experimental$condition_related <-
  with(experimental, sprintf(
    '"%s"}, "mymessage", {html: "+"}, "mymessage", {html: "%s"', 
    prime_related, target
  ))

experimental$condition_unrelated <-
  with(experimental, sprintf(
    '"%s"}, "mymessage", {html: "+"}, "mymessage", {html: "%s"', 
    prime_unrelated, target
  ))

filler$filler <-
  with(filler, sprintf(
    '"%s"}, "mymessage", {html: "+"}, "mymessage", {html: "%s"', 
    prime, target
  ))

#extract
## exp items
stim_exp <- experimental %>% select(item, condition_related, condition_unrelated)
stim_exp %<>% gather(condition, sentence, condition_related:condition_unrelated)
stim_exp %<>% arrange(item,condition)
stim_exp$ibex <- with(stim_exp, sprintf(
  '[["%s", %d],"mymessage", {html: "+"}, "mymessage", {html: %s}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }]', condition, item, sentence
))

## fillers
filler$item <- filler$item+200
stim_fill <- filler %>% select(item, filler)
stim_fill %<>% gather(condition, sentence, filler)
stim_fill %<>% arrange(item,condition)
stim_fill$ibex <- with(stim_fill, sprintf(
  '[["%s", %d],"mymessage", {html: "+"}, "mymessage", {html: %s}, "mymessage", {html: "+"}, "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }]', condition, item, sentence
))

# as a string
stim_exp_string <- paste(stim_exp$ibex, collapse = ",\n")
#stim_exp_string %<>% utf8::utf8_encode()

stim_fill_string <- paste(stim_fill$ibex, collapse = ",\n")
#stim_fill_string %<>% utf8::utf8_encode()

exp_js_file <- "../data_includes/experiment.js"
file.copy("stimuli_template_top", exp_js_file)
cat(stim_exp_string, file = exp_js_file, append = T )
cat(", \n", file = exp_js_file, append = T)
cat(stim_fill_string, file = exp_js_file, append = T )
cat(readLines("stimuli_template_bottom", encoding = "utf-8"), 
    file = exp_js_file, append = T)
