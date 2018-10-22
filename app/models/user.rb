class User < ActiveRecord::Base
  acts_as_voter
  has_many :reviews, dependent: :destroy
  extend FriendlyId
  friendly_id :email, use: :slugged
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
