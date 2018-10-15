source "https://rubygems.org"
git_source(:github){|repo| "https://github.com/#{repo}.git"}

ruby "2.5.1"

gem "bcrypt"
gem "bootsnap", ">= 1.1.0", require: false
gem "config"
gem "devise_token_auth"
gem "graphql-client"
gem "jbuilder", "~> 2.5"
gem "kaminari"
gem "mysql2", ">= 0.4.4", "< 0.6.0"
gem "omniauth"
gem "puma", "~> 3.11"
gem "rack-cors", require: "rack/cors"
gem "rails", "~> 5.2.1"
gem "sass-rails", "~> 5.0"
gem "uglifier", ">= 1.3.0"
gem "webpacker"

group :development, :test do
  gem "pry-rails"
  gem 'factory_bot_rails'
  gem 'shoulda'
  gem 'rspec-rails', '3.6.1'
end

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "rubocop", "~> 0.54.0", require: false
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
  gem 'will_paginate', '~> 3.1.0'
end

group :test do
  gem "capybara", ">= 2.15"
  gem "chromedriver-helper"
  gem "selenium-webdriver"
end

gem "graphql-client"
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'elasticsearch-model'
gem 'elasticsearch-rails'
