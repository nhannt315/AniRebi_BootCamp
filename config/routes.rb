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
  namespace :api do
    namespace :v1 do
      resources :animes do
        collection do
          get "top_animes"
          get "search_by_genre"
          get "filter"
        end
      end
      resources :genres do
        collection do
          get "top_genres"
        end
      end
      resources :search do
        collection do
          get "search"
        end
      end
    end
  end
  get "*path", to: "pages#root"
end
