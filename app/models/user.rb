class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :email, use: :slugged
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
