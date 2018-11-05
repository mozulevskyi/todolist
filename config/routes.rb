Rails.application.routes.draw do
  root 'home#index'

  apipie
  resources :projects do
    resources :tasks do
      resources :comments
    end
  end
end
