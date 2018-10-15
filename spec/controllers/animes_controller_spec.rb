require "rails_helper"

RSpec.describe Api::V1::AnimesController, type: :controller do
  let!(:animes) {FactoryBot.create_list(:anime, 20)}

  let(:anime_id) {animes.first.id}

  describe "get all animes", :type => :request do

    before {get '/api/v1/animes'}

    it 'returns all animes' do
      expect(JSON.parse(response.body).size).to eq(20)
    end

    it 'returns status code 200' do
      expect(response).to be_successful
    end
  end

  describe "get the anime", :type => :request do

    before {get "/api/v1/animes/#{anime_id}"}

    it 'returns the anime' do
      expect(JSON.parse(response.body)['id']).to eq(anime_id)
    end

    it 'returns status code 200' do
      expect(response).to be_successful
    end
  end

  describe "get top animes route", :type => :request do

    before {get '/api/v1/animes/top_animes'}

    it 'returns status code 200' do
      expect(response).to be_successful
    end

    it 'returns top animes' do
      expect(JSON.parse(response.body).size).to eq(20)
      expect(JSON.parse(response.body).each_cons(2).all? {|a, b| a['rating'] >= b['rating']})
    end
  end
end
