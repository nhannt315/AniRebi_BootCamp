Rails.application.routes.draw do

  mount_devise_token_auth_for "User", at: "auth", controllers: {
      confirmations: "auth/confirmations",
      passwords: "auth/passwords",
      omniauth_callbacks: "auth/omniauth_callbacks",
      registrations: "auth/registrations",
      sessions: "auth/sessions",
      token_validations: "auth/token_validations"
  }

  root to: "pages#root"
  get "/reset_pwd", to: "pages#reset"

  namespace :api do
    namespace :v1 do
      resources :animes do
        collection do
          get "top_animes"
          get "search_by_genre"
        end
      end
      resources :genres do
        collection do
          get "top_genres"
          get "all_genres"
        end
        member do
          get "anime_list"
        end
      end
      resources :search do
        collection do
          get "search"
        end
      end
      resources :reviews do
        collection do
          get "like"
          get "dislike"
          get "get_by_anime"
        end
      end
      resources :users
    end
  end
  scope :admin do
    get "", to: "pages#admin"
    get "*path", to: "pages#admin"
  end
  get "*path", to: "pages#root"
end
