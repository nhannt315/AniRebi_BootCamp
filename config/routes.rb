Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "auth", controllers: {
    confirmations:      "auth/confirmations",
    passwords:          "auth/passwords",
    omniauth_callbacks: "auth/omniauth_callbacks",
    registrations:      "auth/registrations",
    sessions:           "auth/sessions",
    token_validations:  "auth/token_validations"
  }
  root to: "pages#root"
  get "*path", to: "pages#root"
end
