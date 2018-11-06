json.array! @genres do |genre|
  json.id genre.id
  json.name genre.name
  json.total_anime genre.animes.count
end