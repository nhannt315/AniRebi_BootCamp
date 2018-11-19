#!/bin/sh

echo "Installing dependencies"
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
apt-get update
apt-get install elasticsearch
apt-get install apt-transport-https
apt-get install -y build-essential libpq-dev nodejs ntp yarn
echo "Dependencies installed successfully!"

echo "Creating db"
rails db:create
bundle install
rails db:migrate
rails db < db/animes.sql
rails db < db/genres.sql
rails db < anime_genres.sql
rails db:seed
echo "Creating db done"
gem install foreman
yarn install
rails update:all
echo "Assets Precompiling"
rails assets:precompile
echo "Assets Precompiling done"
