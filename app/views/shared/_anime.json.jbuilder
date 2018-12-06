json.id anime.id
json.name anime.name
json.info anime.info
json.status anime.status
json.video_url anime.video_url
json.rating anime.rating
json.title_english anime.title_english
json.title_native anime.title_native
if anime.banner_identifier.present? && (anime.banner_identifier.include? "https")
  json.banner anime.banner_identifier
else
  json.banner anime.banner.url
end
if anime.cover_medium_identifier.present? && (anime.cover_medium_identifier.include? "https")
  json.cover_medium anime.cover_medium_identifier
else
  json.cover_medium anime.cover_medium.url
end
if anime.cover_large_identifier.present? && (anime.cover_large_identifier.include? "https")
  json.cover_large anime.cover_large_identifier
else
  json.cover_large anime.cover_large.url
end
json.genres anime.genres
json.reviews_count anime.reviews_count
