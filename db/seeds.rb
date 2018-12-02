# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'ffaker'
require 'net/http'

user_count = 50
review_count = 400

review_list = Array.new
user_list = Array.new

for i in 1..user_count
  user_list.push({
    email: FFaker::Internet.email,
    name: FFaker::Name.name,
    password: '1234567'
    })
end

user_list.each do |user|
  User.create(user)
end

User.create(
        email: "admin@gmail.com",
        password: "admin123",
        password_confirmation: "admin123",
        admin: true
)

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

animes = Anime.all
default = "https://www.youtube.com/watch?v=4m3h7BvXo54"
animes.each_with_index do |anime, index|
  url = URI.parse("https://www.googleapis.com/youtube/v3/search?part=id&q=#{URI.encode(anime.name.gsub(' ','+'))}&type=video&maxResults=1&key=AIzaSyBakDUD7ArGiGyLpoVf09dzaMPmH7Kfe90")
  puts "Fetch video for anime[#{index}]"
  req = Net::HTTP::Get.new(url.to_s)
  res = Net::HTTP.start(url.host, url.port, :use_ssl => url.scheme == 'https') {|http|
    http.request(req)
  }
  hash = JSON.parse res.body
  if hash['items'].length > 0
    anime.update_attribute :video_url, "https://www.youtube.com/watch?v=#{hash['items'][0]['id']['videoId']}"
  else 
    anime.update_attribute :video_url, default
  end
end