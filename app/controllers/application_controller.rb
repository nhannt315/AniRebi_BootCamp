class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_sessions, if: :devise_controller?
  include DeviseTokenAuth::Concerns::SetUserByToken
end
