Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  apipie
  jsonapi_resources :projects do
    jsonapi_resources :tasks do
      jsonapi_resources :comments
    end
  end
end
