library(twitteR)
library(ROAuth)
library(httr)
library(dplyr)
library(sentiment)

api_key <- "Lwr8KBYcRSXmpFWYnE0cOf8Xj"
api_secret <- "	z1RNQQC0uDGgLAO5TbXqGzMCtxKiDTPc8heJtFThIAYCP2JLtU"
access_token <- "	297633450-r8NnTPNmOM7VNb3vcz0GeZT99nv0D4DXwo5Devwn"
access_token_secret <- "	tB4DeGAWr3HnRfWrGZqQmxNS1YDLwK7tp4xXZJGl10oIC"
setup_twitter_oauth(api_key, api_secret, access_token, access_token_secret)


setup_twitter_oauth(consumer_key = api_key, consumer_secret = api_secret,
                    access_token = access_token, access_secret = access_token_secret)

Twitter <- read.csv('https://s3.amazonaws.com/d4d-public/public/ice_extract.csv')


Twitter$text = gsub("(RT|via)((?:\\b\\W*@\\w+)+)", "", Twitter$text)
# remove at people
Twitter$text = gsub("@\\w+", "", Twitter$text)
# remove punctuation
Twitter$text = gsub("[[:punct:]]", "", Twitter$text)
# remove numbers
Twitter$text = gsub("[[:digit:]]", "", Twitter$text)
# remove html links
Twitter$text = gsub("http\\w+", "", Twitter$text)
# remove unnecessary spaces
Twitter$text = gsub("[ \t]{2,}", "", Twitter$text)
Twitter$text = gsub("^\\s+|\\s+$", "", Twitter$text)
Twitter$polarity = classify_polarity(Twitter$text, algorithm="bayes")

Location <- group_by(Twitter, user_location) %>% summarize(count = n(), sum(as.numeric(polarity)))
Location <- Location[Location$count > 10,]
Location$average <- Location$`sum(as.numeric(polarity))`/ Location$count
Location <- Location[Location$average > 5,]


if ( NILCFINAL$STATE..Required.[1] == Db$Location[i]){
  
  sender <- "tylerjrichards@gmail.com"
  recipients <- paste(Db$Phone_Number[1], "@tmomail.net", sep = "")
  message <- paste("There was an ICE Raid in your area, the reported area is ", NILCFINAL$Zip.Code[1], ". And the Number of affected people are " , NILCFINAL$PERSONS[1], sep = "")
  send.mail(from = sender,
            to = recipients,
            subject = "ICE Raid",
            body = message,
            smtp = list(host.name = "smtp.gmail.com", port = 465, 
                        user.name = "emoteuf@gmail.com",            
                        passwd = "ldtchs1850", ssl = TRUE),
            authenticate = TRUE,
            send = TRUE)
}
