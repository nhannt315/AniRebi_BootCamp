require 'rails_helper'

describe "get all genres route", :type => :request do
  let!(:genres) { FactoryBot.create_list(:genre, 20)}

  before { get '/api/v1/genres'}

  it 'returns all genres' do
      expect(JSON.parse(response.body).size).to eq(20)
  end

  it 'returns status code 200' do
    expect(response).to have_http_status(:success)
  end
end
