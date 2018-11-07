json.total @count
json.animes @animes do |anime|
  json.id anime.id
  json.name anime.name
  json.info anime.info
  json.status anime.status
  json.rating anime.rating
  json.title_english anime.title_english
  json.title_native anime.title_native
  json.banner anime.banner
  json.cover_large anime.cover_large
  json.cover_medium anime.cover_medium
  json.genres anime.genres
end
