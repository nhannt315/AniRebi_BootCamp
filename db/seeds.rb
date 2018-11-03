# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'ffaker'

user_count = 50
review_count = 400

review_list = Array.new
user_list = Array.new

for i in 1..user_count
  user_list.push({
    email: FFaker::Internet.email,
    password: '1234567'
    })
end

user_list.each do |user|
  User.create(user)
end

for i in 1..review_count
  lang = rand(1..4)
  case lang
  when 1
    content = FFaker::LoremRU.paragraph
  when 2
    content = FFaker::LoremAR.paragraph
  when 3
    content = FFaker::LoremCN.paragraph
  when 4
    content = FFaker::LoremKR.paragraph
  end
  review_list.push({
    user_id: User.all.ids.sample,
    anime_id: Anime.all.ids.sample,
    title: FFaker::Tweet.tweet,
    content: content,
    rating: (rand(0..10).to_f)/2
    })
end

review_list.each do |review|
  Review.create(review)
end
