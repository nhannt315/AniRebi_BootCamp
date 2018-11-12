json.id anime.id
json.name anime.name
json.info anime.info
json.status anime.status
json.rating anime.rating
json.title_english anime.title_english
json.title_native anime.title_native
if anime.seed == false
  json.banner anime.banner.url
  json.cover_large anime.cover_large.url
  json.cover_medium anime.cover_medium.url
else
  json.banner anime.banner_identifier
  json.cover_large anime.cover_large_identifier
  json.cover_medium anime.cover_medium_identifier
end
json.genres anime.genres
json.reviews_count anime.reviews_count