require "graphql/client"
require "graphql/client/http"

namespace :crawl do
  task anime: :environment do

    HTTPAdapter = GraphQL::Client::HTTP.new("https://graphql.anilist.co") do
      def headers(context)
        {
          "Content-Type" => "application/json",
          "Accept" => "application/json"
        }
      end
    end

    Schema = GraphQL::Client.load_schema(HTTPAdapter)
    Client = GraphQL::Client.new(
      schema: Schema,
      execute: HTTPAdapter
    )
    MediaQuery = Client.parse <<-'GRAPHQL'
      query($id: Int) {
        Media(id: $id) {
          title {
            english,
            romaji,
            native
          }
          description,
          status,
          meanScore,
          bannerImage,
          coverImage {
            large,
            medium
          }
        }
      }
    GRAPHQL

    i = 15125
    count = 0
    crawlNumber = 400
    while count < crawlNumber
      result = Client.query(MediaQuery,variables: {id: i});
      unless result.data.nil?
        name = result.data.media.title.romaji
        title_english = result.data.media.title.english
        title_native = result.data.media.title.native
        info = result.data.media.description
        status = result.data.media.status
        rating = result.data.media.mean_score
        banner = result.data.media.banner_image
        cover_large = result.data.media.cover_image.large
        cover_medium = result.data.media.cover_image.medium
        value = { name: name, info: info, status: status, rating: rating, title_english: title_english,
        title_native: title_native, banner: banner, cover_large: cover_large, cover_medium: cover_medium }
        Anime.create(value)
        count += 1
      end
      i += 1
      sleep 0.5
    end

    puts 'Done.'
  end
end
