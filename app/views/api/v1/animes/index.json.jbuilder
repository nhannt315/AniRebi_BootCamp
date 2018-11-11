json.total @total
json.animes @animes do |anime|
  json.id anime.id
  json.name anime.name
  json.info anime.info
  json.status anime.status
  json.rating anime.rating
  json.title_english anime.title_english
  json.title_native anime.title_native
  json.banner anime.banner.url
  json.cover_large anime.cover_large.url
  json.cover_medium anime.cover_medium.url
  json.genres anime.genres
  json.reviews_count anime.reviews_count
end
