Rails.application.routes.draw do

  apipie
  resources :projects do
    resources :tasks do
      resources :comments
    end
  end
end
