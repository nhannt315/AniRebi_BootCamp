# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'ffaker'

review_count = 10

review_list = Array.new

for i in 1..review_count
  review_list.push({
    user_id: User.all.ids.sample,
    anime_id: Anime.all.ids.sample,
    title: FFaker::Tweet.tweet,
    content: FFaker::LoremRU.paragraph,
    rating: (rand(1..10).to_f)/2
    })
end

review_list.each do |review|
  Review.create(review)
end
