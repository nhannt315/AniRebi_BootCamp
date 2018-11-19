FROM ruby:2.5

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs ntp yarn


RUN mkdir /bootcamp
WORKDIR /bootcamp

COPY Gemfile Gemfile.lock package.json yarn.lock ./

RUN bundle install

VOLUME /user/local/bundle

ADD . /gpc-app


