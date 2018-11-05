Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  apipie
  resources :projects do
    resources :tasks do
      resources :comments
    end
  end
end
